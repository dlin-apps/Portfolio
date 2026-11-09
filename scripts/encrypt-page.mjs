#!/usr/bin/env node
// Builds a password-protected page from a readable source in private/.
//
//   node scripts/encrypt-page.mjs workday
//
// Reads private/<name>.html, inlines every images/<name>/* reference as a
// data URI (so no readable images are ever published), encrypts the whole
// page with AES-256-GCM using a key derived from the password (PBKDF2-SHA256),
// and writes <name>.html: a lock screen that decrypts in the browser.
//
// The password is read from a hidden prompt, or from PAGE_PASSWORD if set.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ITERATIONS = 600000;
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) {
    console.error('Usage: node scripts/encrypt-page.mjs <page-name>');
    process.exit(1);
}
const srcPath = path.join(ROOT, 'private', `${name}.html`);
if (!existsSync(srcPath)) {
    console.error(`Missing source: ${srcPath}`);
    process.exit(1);
}

function askHidden(question) {
    return new Promise((resolve) => {
        const { stdin, stdout } = process;
        stdout.write(question);
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');
        let value = '';
        stdin.on('data', function onData(ch) {
            if (ch === '\r' || ch === '\n' || ch === '\u0004') {
                stdin.setRawMode(false);
                stdin.pause();
                stdin.removeListener('data', onData);
                stdout.write('\n');
                resolve(value);
            } else if (ch === '\u0003') {
                process.exit(130);
            } else if (ch === '\u007f' || ch === '\b') {
                value = value.slice(0, -1);
            } else {
                value += ch;
            }
        });
    });
}

async function getPassword() {
    if (process.env.PAGE_PASSWORD) return process.env.PAGE_PASSWORD;
    if (!process.stdin.isTTY) {
        console.error('No TTY: set PAGE_PASSWORD or run this in a terminal.');
        process.exit(1);
    }
    const a = await askHidden('Password: ');
    const b = await askHidden('Confirm password: ');
    if (a !== b) { console.error('Passwords do not match.'); process.exit(1); }
    if (a.length < 8) { console.error('Use at least 8 characters.'); process.exit(1); }
    return a;
}

// 1. Inline images as data URIs.
let html = readFileSync(srcPath, 'utf8');
let inlined = 0;
html = html.replace(new RegExp(`(["'(])(images/${name}/[^"')]+)`, 'g'), (m, q, rel) => {
    const file = path.join(ROOT, 'private', rel);
    if (!existsSync(file)) throw new Error(`Missing image: ${file}`);
    const mime = MIME[path.extname(file).toLowerCase()];
    if (!mime) throw new Error(`Unknown image type: ${file}`);
    inlined++;
    return `${q}data:${mime};base64,${readFileSync(file).toString('base64')}`;
});

// 2. Encrypt.
const password = await getPassword();
const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(html)));
const b64 = (u8) => Buffer.from(u8).toString('base64');

// 3. Fill the lock-screen template.
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
const title = titleMatch ? titleMatch[1] : 'Protected — Daan Lindhout';
const label = name.toUpperCase();
const template = readFileSync(path.join(ROOT, 'scripts', 'lock-template.html'), 'utf8');
const out = template
    .replaceAll('{{TITLE}}', title)
    .replaceAll('{{LABEL}}', label)
    .replaceAll('{{NAME}}', name)
    .replace('{{PAYLOAD}}', JSON.stringify({ v: 1, it: ITERATIONS, s: b64(salt), iv: b64(iv), ct: b64(cipher) }));
writeFileSync(path.join(ROOT, `${name}.html`), out);
console.log(`Wrote ${name}.html (${(out.length / 1048576).toFixed(1)} MB, ${inlined} images inlined).`);
