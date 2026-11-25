// Shared Navigation Component
// Include this script in all pages to ensure consistent navigation

(function() {
    // Navigation HTML template
    var navHTML = '<button class="nav-menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav-links">' +
        '<svg class="icon-open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16" /></svg>' +
        '<svg class="icon-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" /></svg>' +
        '</button>' +
        '<a href="index.html" class="nav-logo"><img src="images/logo.png" alt="DL Logo"></a>' +
        '<div class="nav-right">' +
        '<div class="nav-links" id="site-nav-links">' +
        '<a href="index.html" data-page="about">About</a>' +
        '<a href="portfolio.html" data-page="portfolio">Portfolio</a>' +
        '<a href="tenets.html" data-page="tenets">Tenets</a>' +
        '<a href="writing.html" data-page="writing">Writing</a>' +
        '<a href="resume.html" data-page="resume">Resume</a>' +
        '<a href="lab.html" data-page="lab">Lab</a>' +
        '<a href="contact.html" data-page="contact">Contact</a>' +
        '</div>' +
        '<button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">' +
        '<svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>' +
        '<svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="display:none;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>' +
        '</button>' +
        '</div>';

    // Navigation CSS
    var navCSS = 'nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.5rem 4rem; display: flex; justify-content: space-between; align-items: center; background: var(--nav-bg); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); max-width: 100%; }';
    navCSS += '.nav-logo { display: flex; align-items: center; margin: -0.75rem 0; }';
    navCSS += '.nav-logo img { height: 56px; width: auto; background: transparent; }';
    navCSS += '.nav-right { display: flex; align-items: center; }';
    navCSS += '.nav-links { display: flex; gap: 2.5rem; }';
    navCSS += '.nav-links a { color: var(--text-secondary); text-decoration: none; font-size: 0.875rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.3s ease; }';
    navCSS += '.nav-links a:hover, .nav-links a.active { color: var(--accent); }';
    navCSS += '.nav-links a:focus { outline: 2px solid var(--accent); outline-offset: 2px; color: var(--accent); }';
    navCSS += '.theme-toggle { background: none; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; padding: 0.5rem; border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; margin-left: 1.5rem; }';
    navCSS += '.theme-toggle:hover { border-color: var(--accent); color: var(--accent); }';
    navCSS += '.theme-toggle:focus { outline: 2px solid var(--accent); outline-offset: 2px; border-color: var(--accent); color: var(--accent); }';
    navCSS += '.theme-toggle svg { width: 18px; height: 18px; }';
    navCSS += '@media (max-width: 1024px) { nav { padding: 1.5rem 2rem; } }';
    // Menu button (hidden on desktop)
    navCSS += '.nav-menu-btn { display: none; background: none; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; padding: 0.5rem; border-radius: 4px; align-items: center; justify-content: center; transition: all 0.3s ease; }';
    navCSS += '.nav-menu-btn:hover, .nav-menu-btn[aria-expanded="true"] { border-color: var(--accent); color: var(--accent); }';
    navCSS += '.nav-menu-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }';
    navCSS += '.nav-menu-btn svg { width: 18px; height: 18px; display: block; }';
    navCSS += '.nav-menu-btn .icon-close { display: none; }';
    navCSS += '.nav-menu-btn[aria-expanded="true"] .icon-open { display: none; }';
    navCSS += '.nav-menu-btn[aria-expanded="true"] .icon-close { display: block; }';
    // Phones and small tablets: menu button top left, theme toggle top right, links in a dropdown panel
    navCSS += '@media (max-width: 768px) {' +
        ' nav { padding: 0.75rem 1.25rem; justify-content: space-between; }' +
        ' .nav-logo { display: none; }' +
        ' .nav-menu-btn { display: flex; }' +
        ' .nav-links { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 0; padding: 0.5rem 0; background: var(--bg-primary, #0a0a0a); border-bottom: 1px solid var(--border); box-shadow: var(--shadow-hover, 0 8px 24px rgba(0, 0, 0, 0.3)); }' +
        ' nav.menu-open .nav-links { display: flex; }' +
        ' .nav-links a { font-size: 0.9rem; letter-spacing: 0.08em; padding: 0.85rem 1.25rem; border-left: 2px solid transparent; }' +
        ' .nav-links a.active { border-left-color: var(--accent); }' +
        ' .nav-links a:focus { outline-offset: -2px; }' +
        ' .theme-toggle { margin-left: 0; padding: 0.5rem; }' +
        ' .theme-toggle svg { width: 18px; height: 18px; }' +
        ' }';

    // Determine active page from URL
    function getActivePage() {
        var path = window.location.pathname;
        var filename = path.split('/').pop() || 'index.html';
        
        var pageMap = {
            'index.html': 'about',
            '': 'about',
            'portfolio.html': 'portfolio',
            'tenets.html': 'tenets',
            'writing.html': 'writing',
            'resume.html': 'resume',
            'lab.html': 'lab',
            'contact.html': 'contact'
        };
        
        // Lab (independent) case studies highlight Lab, not Portfolio
        var labPages = ['swingscanner', 'chessmatch', 'sessiontimer'];
        for (var j = 0; j < labPages.length; j++) {
            if (filename.indexOf(labPages[j]) !== -1) {
                return 'lab';
            }
        }

        var projectPages = ['workday', 'axon', 'qualtrics', 'moz', 'socrata', 'f5', 'sumtotal', 
                            'windowslive', 'photoframe', 'microsoft', 'digitalpen', 
                            'tiltwheel', 'hardwareapps', 'keyboards', 'rightclick', 'bicycle'];
        
        for (var i = 0; i < projectPages.length; i++) {
            if (filename.indexOf(projectPages[i]) !== -1) {
                return 'portfolio';
            }
        }
        
        return pageMap[filename] || 'about';
    }

    // Initialize navigation
    function initNav() {
        var styleEl = document.createElement('style');
        styleEl.id = 'nav-component-styles';
        styleEl.textContent = navCSS;
        document.head.appendChild(styleEl);
        
        var navEl = document.querySelector('nav');
        if (navEl) {
            navEl.innerHTML = navHTML;
            
            var activePage = getActivePage();
            var activeLink = navEl.querySelector('[data-page="' + activePage + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            if (typeof updateToggleIcons === 'function') {
                updateToggleIcons(localStorage.getItem('theme') || 'dark');
            }

            initMenu(navEl);
        }
    }

    // Mobile menu: open/close the dropdown panel
    function initMenu(navEl) {
        var btn = navEl.querySelector('.nav-menu-btn');
        if (!btn) return;

        function setOpen(open) {
            navEl.classList.toggle('menu-open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        }

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            setOpen(!navEl.classList.contains('menu-open'));
        });
        // Close after choosing a page
        navEl.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() { setOpen(false); });
        });
        // Close when tapping outside the nav
        document.addEventListener('click', function(e) {
            if (navEl.classList.contains('menu-open') && !navEl.contains(e.target)) setOpen(false);
        });
        // Close with Escape and return focus to the button
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navEl.classList.contains('menu-open')) {
                setOpen(false);
                btn.focus();
            }
        });
        // Close if the window grows back to desktop width
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navEl.classList.contains('menu-open')) setOpen(false);
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
