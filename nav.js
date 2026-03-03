// Shared Navigation Component
// Include this script in all pages to ensure consistent navigation

(function() {
    // Navigation HTML template
    const navHTML = `
        <div class="nav-links">
            <a href="index.html" data-page="about">About</a>
            <a href="portfolio.html" data-page="portfolio">Portfolio</a>
            <a href="tenets.html" data-page="tenets">Tenets</a>
            <a href="writing.html" data-page="writing">Writing</a>
            <a href="resume.html" data-page="resume">Resume</a>
            <a href="contact.html" data-page="contact">Contact</a>
        </div>
        <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="display:none;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </button>
    `;

    // Navigation CSS (injected into head)
    const navCSS = `
        nav { 
            position: fixed; 
            top: 0; 
            left: 0; 
            right: 0; 
            z-index: 100; 
            padding: 1.5rem 4rem; 
            display: flex; 
            justify-content: flex-end; 
            align-items: center; 
            background: var(--nav-bg); 
            backdrop-filter: blur(20px); 
            border-bottom: 1px solid var(--border); 
        }
        .nav-links { 
            display: flex; 
            gap: 2.5rem; 
        }
        .nav-links a { 
            color: var(--text-secondary); 
            text-decoration: none; 
            font-size: 0.875rem; 
            font-weight: 500; 
            letter-spacing: 0.05em; 
            text-transform: uppercase; 
            transition: color 0.3s ease; 
        }
        .nav-links a:hover, .nav-links a.active { 
            color: var(--accent); 
        }
        .theme-toggle { 
            background: none; 
            border: 1px solid var(--border); 
            color: var(--text-secondary); 
            cursor: pointer; 
            padding: 0.5rem; 
            border-radius: 4px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            transition: all 0.3s ease; 
            margin-left: 1.5rem; 
        }
        .theme-toggle:hover { 
            border-color: var(--accent); 
            color: var(--accent); 
        }
        .theme-toggle svg { 
            width: 18px; 
            height: 18px; 
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
            nav { 
                padding: 1rem 1.5rem; 
            }
            .nav-links { 
                gap: 0.75rem; 
                flex-wrap: wrap; 
                justify-content: center; 
            }
            .nav-links a { 
                font-size: 0.7rem; 
                letter-spacing: 0.02em; 
            }
            .theme-toggle { 
                margin-left: 0.75rem; 
                padding: 0.4rem; 
            }
            .theme-toggle svg { 
                width: 16px; 
                height: 16px; 
            }
        }
        
        @media (max-width: 480px) {
            nav { 
                padding: 0.75rem 1rem; 
            }
            .nav-links { 
                gap: 0.5rem; 
            }
            .nav-links a { 
                font-size: 0.6rem; 
            }
        }
    `;

    // Determine active page from URL
    function getActivePage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        // Map filenames to page identifiers
        const pageMap = {
            'index.html': 'about',
            '': 'about',
            'portfolio.html': 'portfolio',
            'tenets.html': 'tenets',
            'writing.html': 'writing',
            'resume.html': 'resume',
            'contact.html': 'contact'
        };
        
        // Project pages map to portfolio
        const projectPages = ['axon', 'qualtrics', 'moz', 'socrata', 'f5', 'sumtotal', 
                            'windowslive', 'photoframe', 'microsoft', 'digitalpen', 
                            'tiltwheel', 'hardwareapps', 'keyboards', 'rightclick', 'bicycle'];
        
        for (const project of projectPages) {
            if (filename.includes(project)) {
                return 'portfolio';
            }
        }
        
        return pageMap[filename] || 'about';
    }

    // Initialize navigation
    function initNav() {
        // Inject CSS
        const styleEl = document.createElement('style');
        styleEl.id = 'nav-component-styles';
        styleEl.textContent = navCSS;
        document.head.appendChild(styleEl);
        
        // Find nav element and inject HTML
        const navEl = document.querySelector('nav');
        if (navEl) {
            navEl.innerHTML = navHTML;
            
            // Set active state
            const activePage = getActivePage();
            const activeLink = navEl.querySelector(\`[data-page="\${activePage}"]\`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            // Initialize theme toggle icons
            if (typeof updateToggleIcons === 'function') {
                updateToggleIcons(localStorage.getItem('theme') || 'dark');
            }
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
