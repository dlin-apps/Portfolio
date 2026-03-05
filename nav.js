// Shared Navigation Component
// Include this script in all pages to ensure consistent navigation

(function() {
    // Navigation HTML template
    var navHTML = '<a href="index.html" class="nav-logo"><img src="images/logo.png" alt="DL Logo"></a>' +
        '<div class="nav-right">' +
        '<div class="nav-links">' +
        '<a href="index.html" data-page="about">About</a>' +
        '<a href="portfolio.html" data-page="portfolio">Portfolio</a>' +
        '<a href="tenets.html" data-page="tenets">Tenets</a>' +
        '<a href="writing.html" data-page="writing">Writing</a>' +
        '<a href="resume.html" data-page="resume">Resume</a>' +
        '<a href="contact.html" data-page="contact">Contact</a>' +
        '</div>' +
        '<button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">' +
        '<svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>' +
        '<svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="display:none;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>' +
        '</button>' +
        '</div>';

    // Navigation CSS
    var navCSS = 'nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0.25rem 4rem; display: flex; justify-content: space-between; align-items: center; background: var(--nav-bg); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); max-width: 100%; }';
    navCSS += '.nav-logo { display: flex; align-items: center; }';
    navCSS += '.nav-logo img { height: 48px; width: auto; background: transparent; }';
    navCSS += '.nav-right { display: flex; align-items: center; }';
    navCSS += '.nav-links { display: flex; gap: 2.5rem; }';
    navCSS += '.nav-links a { color: var(--text-secondary); text-decoration: none; font-size: 0.875rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.3s ease; }';
    navCSS += '.nav-links a:hover, .nav-links a.active { color: var(--accent); }';
    navCSS += '.nav-links a:focus { outline: 2px solid var(--accent); outline-offset: 2px; color: var(--accent); }';
    navCSS += '.theme-toggle { background: none; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; padding: 0.5rem; border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; margin-left: 1.5rem; }';
    navCSS += '.theme-toggle:hover { border-color: var(--accent); color: var(--accent); }';
    navCSS += '.theme-toggle:focus { outline: 2px solid var(--accent); outline-offset: 2px; border-color: var(--accent); color: var(--accent); }';
    navCSS += '.theme-toggle svg { width: 18px; height: 18px; }';
    navCSS += '@media (max-width: 1024px) { nav { padding: 0.25rem 2rem; } }';
    navCSS += '@media (max-width: 768px) { nav { padding: 0.5rem 1.5rem; justify-content: flex-end; } .nav-logo { display: none; } .nav-links { gap: 0.75rem; flex-wrap: wrap; justify-content: center; } .nav-links a { font-size: 0.7rem; letter-spacing: 0.02em; } .theme-toggle { margin-left: 0.75rem; padding: 0.4rem; } .theme-toggle svg { width: 16px; height: 16px; } }';
    navCSS += '@media (max-width: 480px) { nav { padding: 0.5rem 1rem; } .nav-links { gap: 0.5rem; } .nav-links a { font-size: 0.6rem; } }';

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
            'contact.html': 'contact'
        };
        
        var projectPages = ['axon', 'qualtrics', 'moz', 'socrata', 'f5', 'sumtotal', 
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
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
