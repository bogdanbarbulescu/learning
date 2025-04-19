document.addEventListener('DOMContentLoaded', () => {
    // --- Constants ---
    const SIDEBAR_BREAKPOINT = 768; // Pixels for mobile sidebar behavior
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';
    const DEFAULT_MODULE = 'dashboard'; // Fallback module

    // --- Element Selectors ---
    // Use optional chaining (?.) for elements that might not be critical if missing
    const wrapper = document.getElementById('wrapper');
    const menuToggle = document.getElementById('menu-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleText = document.getElementById('theme-toggle-text');
    const themeToggleIcon = themeToggle?.querySelector('i');
    const mainContent = document.getElementById('main-content');
    const sidebarNavLinks = document.querySelectorAll('#sidenav .nav-link');
    const breadcrumbModule = document.getElementById('breadcrumb-module');
    const sidebarElement = document.getElementById('sidenav'); // Needed for click outside logic

    // --- Theme Handling ---

    /**
     * Applies the specified theme (light or dark) to the document.
     * @param {string} theme - The theme to apply ('light' or 'dark').
     */
    const applyTheme = (theme) => {
        console.log("Applying theme:", theme); // Debug log
        const isDarkMode = theme === THEME_DARK;

        // Toggle the attribute on the root <html> element
        // setAttribute/removeAttribute is slightly more explicit than toggleAttribute
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', THEME_DARK);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        console.log("<html> data-theme attribute:", document.documentElement.getAttribute('data-theme')); // Debug log

        // Update toggle button appearance
        if (themeToggleIcon) {
             themeToggleIcon.classList.toggle('fa-sun', !isDarkMode);
             themeToggleIcon.classList.toggle('fa-moon', isDarkMode);
        }
         if (themeToggleText) {
            themeToggleText.textContent = isDarkMode ? 'Mod Luminos' : 'Mod Întunecat';
         }
    };

    // Determine and apply initial theme on page load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Priority: Saved theme > System preference > Default (Light)
    const initialTheme = savedTheme || (prefersDark ? THEME_DARK : THEME_LIGHT);
    console.log("Initial check - Saved:", savedTheme, "PrefersDark:", prefersDark, "InitialTheme:", initialTheme); // Debug log
    applyTheme(initialTheme); // Apply the determined theme

    // Theme toggle button listener
    themeToggle?.addEventListener('click', () => {
        console.log("Theme toggle clicked!"); // Debug log
        // Check the current theme based *directly* on the attribute for reliability
        const currentTheme = document.documentElement.hasAttribute('data-theme') ? THEME_DARK : THEME_LIGHT;
        const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        console.log(`Switching from ${currentTheme} to ${newTheme}`); // Debug log

        localStorage.setItem('theme', newTheme); // Save preference
        applyTheme(newTheme); // Apply the new theme
    });

    // --- Sidebar Toggle ---
    menuToggle?.addEventListener('click', () => {
        wrapper?.classList.toggle('toggled');
        // Add/remove body class for overlay only on mobile when sidebar is open
        if (window.innerWidth <= SIDEBAR_BREAKPOINT) {
             document.body.classList.toggle('sidebar-toggled', wrapper?.classList.contains('toggled'));
        }
    });

    // Close sidebar if clicking outside of it on mobile
    document.addEventListener('click', (event) => {
        // Check if on mobile, sidebar is toggled open, and the click target is valid
        if (window.innerWidth <= SIDEBAR_BREAKPOINT && wrapper?.classList.contains('toggled')) {
            // Ensure sidebarElement and menuToggle exist before checking contains
            const isClickInsideSidebar = sidebarElement?.contains(event.target);
            const isClickOnMenuToggle = menuToggle?.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnMenuToggle) {
                wrapper.classList.remove('toggled');
                document.body.classList.remove('sidebar-toggled');
            }
        }
    });


    // --- Dynamic Content Loading (SPA Simulation) ---

    // Mapping module IDs to their titles and content generator functions
    const moduleContent = {
        'dashboard': { title: 'Dashboard', generator: generateDashboardContent },
        'fourier': { title: 'Explorer Fourier', generator: generateModulePlaceholder },
        'convolution': { title: 'Simulator Convoluție', generator: generateModulePlaceholder },
        'filters': { title: 'Explorer Filtre', generator: generateModulePlaceholder },
        'circuits': { title: 'Circuite Analogice', generator: generateModulePlaceholder },
        'converter': { title: 'Convertor DC/AC', generator: generateModulePlaceholder },
        'satellite': { title: 'Link Budget Satelit', generator: generateModulePlaceholder },
        'pid': { title: 'Control PID', generator: generateModulePlaceholder },
        'image-filters': { title: 'Sandbox Filtre Imagine', generator: generateModulePlaceholder },
        'audio-lab': { title: 'Lab Audio', generator: generateModulePlaceholder },
        'sar-compression': { title: 'Explorer Compresie SAR', generator: generateModulePlaceholder },
        'mod-id': { title: 'Identifică Modulația', generator: generateModulePlaceholder },
        'debug-circuit': { title: 'Depanează Circuitul', generator: generateModulePlaceholder },
        'opt-filter': { title: 'Optimizează Filtrul', generator: generateModulePlaceholder },
        'tune-pid': { title: 'Acordează PID', generator: generateModulePlaceholder },
    };

    // Centralized icon mapping for modules
    const moduleIcons = {
        'dashboard': 'fa-tachometer-alt', 'fourier': 'fa-chart-line', 'convolution': 'fa-asterisk',
        'filters': 'fa-filter', 'circuits': 'fa-microchip', 'converter': 'fa-bolt',
        'satellite': 'fa-satellite-dish', 'pid': 'fa-sliders-h', 'image-filters': 'fa-image',
        'audio-lab': 'fa-volume-up', 'sar-compression': 'fa-radar', 'mod-id': 'fa-signal',
        'debug-circuit': 'fa-wrench', 'opt-filter': 'fa-tasks', 'tune-pid': 'fa-tachometer-alt',
        'default': 'fa-question-circle' // Fallback icon
    };

    /**
     * Generates placeholder HTML content for a module.
     * @param {string} moduleId - The ID of the module.
     * @param {string} title - The display title of the module.
     * @returns {string} HTML string for the placeholder content.
     */
    function generateModulePlaceholder(moduleId, title) {
        const icon = moduleIcons[moduleId] || moduleIcons['default'];
        return `
            <div class="module-placeholder text-center animate__animated animate__fadeIn">
                 <i class="fas ${icon} fa-3x text-muted mb-4"></i>
                <h1 class="h3 mb-3">${title}</h1>
                <p class="lead text-muted">Conținutul pentru modulul "${title}" va fi disponibil aici.</p>
                <p>Acesta este un placeholder. Într-o aplicație reală, aici s-ar încărca simulatorul sau conținutul interactiv specific.</p>
                 <button class="btn btn-primary mt-3">
                     <i class="fas fa-play me-2"></i> Start Modul (Simulare)
                 </button>
            </div>
        `;
    }

    /**
     * Generates the specific HTML content for the dashboard.
     * @param {string} moduleId - The ID of the module ('dashboard').
     * @param {string} title - The display title ('Dashboard').
     * @returns {string} HTML string for the dashboard content.
     */
     function generateDashboardContent(moduleId, title) {
        return `
             <div class="animate__animated animate__fadeIn">
                <h1 class="h2 mb-4">Bine ai venit la LearnX!</h1>
                <p class="lead mb-5">Platforma ta interactivă pentru concepte de inginerie. Selectează un modul din meniul lateral pentru a începe.</p>

                 <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                     <div class="col">
                         <div class="card h-100 shadow-sm">
                             <div class="card-body text-center">
                                 <i class="fas fa-lightbulb fa-3x text-warning mb-3"></i>
                                 <h5 class="card-title">Explorează Fundamentele</h5>
                                 <p class="card-text small text-muted">Vizualizează concepte cheie precum transformata Fourier și convoluția.</p>
                                 <a href="#fourier" class="btn btn-sm btn-outline-primary mt-2 stretched-link" data-module="fourier">Mergi la Fundamente <i class="fas fa-arrow-right ms-1"></i></a>
                             </div>
                         </div>
                     </div>
                     <div class="col">
                         <div class="card h-100 shadow-sm">
                             <div class="card-body text-center">
                                 <i class="fas fa-cogs fa-3x text-info mb-3"></i>
                                 <h5 class="card-title">Testează Simulatoare</h5>
                                 <p class="card-text small text-muted">Construiește circuite, controlează sisteme și experimentează practic.</p>
                                  <a href="#circuits" class="btn btn-sm btn-outline-primary mt-2 stretched-link" data-module="circuits">Mergi la Simulatoare <i class="fas fa-arrow-right ms-1"></i></a>
                             </div>
                         </div>
                     </div>
                      <div class="col">
                         <div class="card h-100 shadow-sm">
                             <div class="card-body text-center">
                                 <i class="fas fa-gamepad fa-3x text-success mb-3"></i>
                                 <h5 class="card-title">Acceptă Provocări</h5>
                                 <p class="card-text small text-muted">Testează-ți abilitățile cu exerciții practice și scenarii de depanare.</p>
                                 <a href="#debug-circuit" class="btn btn-sm btn-outline-primary mt-2 stretched-link" data-module="debug-circuit">Mergi la Provocări <i class="fas fa-arrow-right ms-1"></i></a>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        `;
     }

    /**
     * Loads content into the main area based on the module ID.
     * @param {string} moduleId - The ID of the module to load.
     */
    const loadContent = (moduleId) => {
        console.log(`Attempting to load module: ${moduleId}`); // Debug log
        if (!mainContent) {
            console.error("Critical Error: Main content area (#main-content) not found!");
            return;
        }

        mainContent.classList.add('content-loading'); // Visual feedback: Dim content
        const moduleData = moduleContent[moduleId];

        // Simulate network delay/processing time (adjust or remove for production)
        setTimeout(() => {
            try {
                if (moduleData && typeof moduleData.generator === 'function') {
                    console.log(`Generating content for: ${moduleData.title}`); // Debug log
                    mainContent.innerHTML = moduleData.generator(moduleId, moduleData.title);
                    document.title = `${moduleData.title} - LearnX`; // Update page title
                    updateActiveLink(moduleId);
                    updateBreadcrumb(moduleData.title);
                } else {
                    console.error(`Module data or generator function missing for module ID: ${moduleId}`);
                    mainContent.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <strong>Eroare:</strong> Modulul solicitat ("${moduleId}") nu a fost găsit sau configurat corect.
                        </div>`;
                    document.title = "Eroare - LearnX";
                    updateActiveLink(null); // Clear active link state
                    updateBreadcrumb("Eroare");
                }
            } catch (error) {
                 console.error(`Error generating content for module ${moduleId}:`, error);
                 mainContent.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <strong>Eroare la generarea conținutului:</strong> A apărut o problemă neașteptată. (${error.message})
                    </div>`;
                 document.title = "Eroare - LearnX";
                 updateActiveLink(null);
                 updateBreadcrumb("Eroare");
            } finally {
                mainContent.classList.remove('content-loading'); // Restore content visibility
                // Scroll to the top of the main content area after loading new content
                mainContent.scrollTop = 0; // For scrollable main content divs
                window.scrollTo(0, 0); // For the whole window
                console.log(`Finished loading module: ${moduleId}`); // Debug log
            }
        }, 150); // Reduced simulated delay
    };

    /**
     * Updates the visual state (active class) of sidebar navigation links.
     * @param {string|null} moduleId - The ID of the currently active module, or null to deactivate all.
     */
    const updateActiveLink = (moduleId) => {
        sidebarNavLinks.forEach(link => {
            const linkModule = link.dataset.module;
            const isActive = linkModule === moduleId;
            link.classList.toggle('active', isActive);

            // If activating a link within a collapsed section, expand the parent
            if (isActive) {
                const parentCollapse = link.closest('.collapse');
                if (parentCollapse && !parentCollapse.classList.contains('show')) {
                    // Use Bootstrap's JS API for proper animation and state handling
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(parentCollapse);
                    if (bsCollapse) {
                        bsCollapse.show();
                    } else {
                        console.warn(`Bootstrap Collapse instance not found for #${parentCollapse.id}. Cannot expand.`);
                    }
                }
            }
        });
    };

    /**
     * Updates the text of the breadcrumb element.
     * @param {string} moduleTitle - The title to display in the breadcrumb.
     */
     const updateBreadcrumb = (moduleTitle) => {
        if (breadcrumbModule) {
            breadcrumbModule.textContent = moduleTitle;
        } else {
            console.warn("Breadcrumb module element (#breadcrumb-module) not found.");
        }
    };


    // --- Routing ---

    /**
     * Handles changes in the URL hash, loading the corresponding module.
     */
    const handleRouteChange = () => {
        // Get hash, remove '#', provide default if empty
        const hash = window.location.hash.substring(1) || DEFAULT_MODULE;
        console.log(`Route change detected. Hash: #${hash}`); // Debug log

        // Check if the requested module exists in our configuration
        if (!moduleContent[hash]) {
            console.warn(`Invalid module in hash: #${hash}. Redirecting to default: #${DEFAULT_MODULE}.`);
            // Use replaceState to change URL without adding to history, preventing broken back button
            history.replaceState(null, '', `#${DEFAULT_MODULE}`);
            loadContent(DEFAULT_MODULE);
        } else {
            // Load the valid module content
            loadContent(hash);
        }
    };

    // Listen for hash changes (user clicking links, back/forward buttons)
    window.addEventListener('hashchange', handleRouteChange);

    // Initial page load: Handle the route based on the current URL hash
    // Needs to run after all functions are defined.
    handleRouteChange();

     // --- Event Listeners for Navigation ---

     // Add listeners to sidebar links to handle clicks
     sidebarNavLinks.forEach(link => {
         link.addEventListener('click', (e) => {
             // Only process links that are actual module links (have href starting with # and a data-module)
             if (link.matches('a[href^="#"]') && link.dataset.module) {
                 // The actual content loading is handled by the 'hashchange' listener.
                 // This listener only needs to handle UI side-effects, like closing the mobile menu.

                 // Close sidebar on mobile after clicking a module link
                 if (window.innerWidth <= SIDEBAR_BREAKPOINT && wrapper?.classList.contains('toggled')) {
                     menuToggle?.click(); // Simulate a click on the toggle button to close it
                 }
             }
             // No preventDefault() needed, as we want the hash to change naturally.
         });
     });

     // Use event delegation on the main content area to handle clicks on dynamically loaded card links
     mainContent?.addEventListener('click', (e) => {
        // Check if the clicked element or its ancestor is a module link within a card
        const cardLink = e.target.closest('.card a[data-module][href^="#"]');
        if(cardLink) {
            // Again, let the browser handle the hash change. The 'hashchange' listener will do the work.
            // We could potentially close the mobile sidebar here too if a card link was clicked while it was open,
            // but it's less common scenario than clicking the sidebar links directly.
            console.log(`Card link clicked for module: ${cardLink.dataset.module}`); // Debug log
        }
     });

    console.log("LearnX script initialized successfully."); // Final initialization log

}); // End DOMContentLoaded