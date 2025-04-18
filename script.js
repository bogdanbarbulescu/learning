document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('wrapper');
    const menuToggle = document.getElementById('menu-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleText = document.getElementById('theme-toggle-text');
    const themeToggleIcon = themeToggle.querySelector('i');
    const mainContent = document.getElementById('main-content');
    const sidebarNavLinks = document.querySelectorAll('#sidenav .nav-link');
    const breadcrumbModule = document.getElementById('breadcrumb-module');

    // --- Theme Handling ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
            themeToggleText.textContent = 'Mod Luminos';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
            themeToggleText.textContent = 'Mod Întunecat';
        }
    };

    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.hasAttribute('data-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- Sidebar Toggle ---
    menuToggle.addEventListener('click', () => {
        wrapper.classList.toggle('toggled');
        // Add overlay class to body only on mobile when toggled
        if (window.innerWidth <= 768) {
             document.body.classList.toggle('sidebar-toggled', wrapper.classList.contains('toggled'));
        }
    });

    // Close sidebar if clicking outside on mobile
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && wrapper.classList.contains('toggled')) {
            const sidebar = document.getElementById('sidenav');
            // Check if the click is outside the sidebar and not on the toggle button
            if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                wrapper.classList.remove('toggled');
                 document.body.classList.remove('sidebar-toggled');
            }
        }
    });


    // --- Dynamic Content Loading (SPA Simulation) ---

    // Mapping module IDs (from data-module attribute) to content/titles
    const moduleContent = {
        'dashboard': { title: 'Dashboard', generator: generateDashboardContent },
        'fourier': { title: 'Explorer Fourier', generator: generateModulePlaceholder },
        'convolution': { title: 'Simulator Convoluție', generator: generateModulePlaceholder },
        'filters': { title: 'Explorer Filtre', generator: generateModulePlaceholder },
        'circuits': { title: 'Circuite Diode/Tranz.', generator: generateModulePlaceholder },
        'converter': { title: 'Convertor DC/AC', generator: generateModulePlaceholder },
        'satellite': { title: 'Link Budget Satelit', generator: generateModulePlaceholder },
        'pid': { title: 'Control PID', generator: generateModulePlaceholder },
        'image-filters': { title: 'Sandbox Filtre Imagine', generator: generateModulePlaceholder },
        'audio-lab': { title: 'Lab Audio', generator: generateModulePlaceholder },
        'sar-compression': { title: 'Explorer Compresie SAR', generator: generateModulePlaceholder },
        'mod-id': { title: 'Identifică Modulația', generator: generateModulePlaceholder },
        'debug-circuit': { title: 'Debughează Circuitul', generator: generateModulePlaceholder },
        'opt-filter': { title: 'Optimizează Filtrul', generator: generateModulePlaceholder },
        'tune-pid': { title: 'Acordează PID', generator: generateModulePlaceholder },
    };

    function generateModulePlaceholder(moduleId, title) {
         // In a real app, you'd fetch data or load complex UI components here
        const iconMap = { // Basic icon mapping
            'fourier': 'fa-chart-line', 'convolution': 'fa-asterisk', 'filters': 'fa-filter',
            'circuits': 'fa-microchip', 'converter': 'fa-bolt', 'satellite': 'fa-satellite-dish', 'pid': 'fa-sliders-h',
            'image-filters': 'fa-image', 'audio-lab': 'fa-volume-up', 'sar-compression': 'fa-radar',
            'mod-id': 'fa-signal', 'debug-circuit': 'fa-wrench', 'opt-filter': 'fa-tasks', 'tune-pid': 'fa-tachometer-alt',
            'dashboard': 'fa-tachometer-alt'
        };
        const icon = iconMap[moduleId] || 'fa-question-circle';
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

     function generateDashboardContent(moduleId, title) {
        // Example: Show some summary cards or welcome message
        return `
             <div class="animate__animated animate__fadeIn">
                <h1 class="h2 mb-4">Bine ai venit la IngiLearn!</h1>
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


    const loadContent = (moduleId) => {
        console.log(`Loading module: ${moduleId}`);
        if (!mainContent) return; // Exit if main content area doesn't exist

        mainContent.classList.add('content-loading'); // Dim content while loading

        const moduleData = moduleContent[moduleId];

        // Simulate loading time
        setTimeout(() => {
            if (moduleData && typeof moduleData.generator === 'function') {
                mainContent.innerHTML = moduleData.generator(moduleId, moduleData.title);
                document.title = `${moduleData.title} - IngiLearn`; // Update page title
                updateActiveLink(moduleId);
                updateBreadcrumb(moduleData.title);
            } else {
                mainContent.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <strong>Eroare:</strong> Modulul "${moduleId}" nu a fost găsit sau nu a putut fi încărcat.
                    </div>`;
                document.title = "Eroare - IngiLearn";
                updateActiveLink(null); // Remove active state if module not found
                updateBreadcrumb("Eroare");
            }
            mainContent.classList.remove('content-loading'); // Restore opacity
             // Scroll to top of content area after loading
             mainContent.scrollTop = 0;
        }, 200); // 200ms simulated delay

    };

    const updateActiveLink = (moduleId) => {
        sidebarNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.module === moduleId) {
                link.classList.add('active');

                 // Expand parent collapse if it's a sub-link
                const parentCollapse = link.closest('.collapse');
                if(parentCollapse && !parentCollapse.classList.contains('show')) {
                    const collapseTrigger = document.querySelector(`[data-bs-target="#${parentCollapse.id}"]`);
                     if(collapseTrigger && collapseTrigger.classList.contains('collapsed')) {
                        // Use Bootstrap's JS API to ensure proper handling
                        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(parentCollapse);
                        bsCollapse.show();
                        // Note: Bootstrap handles the aria-expanded and collapsed class on the trigger automatically
                    }
                }
            }
        });
    };

     const updateBreadcrumb = (moduleTitle) => {
        if (breadcrumbModule) {
            breadcrumbModule.textContent = moduleTitle;
        }
    };


    // Handle initial page load and hash changes
    const handleRouteChange = () => {
        let hash = window.location.hash.substring(1); // Remove '#'
        if (!hash || !moduleContent[hash]) {
            hash = 'dashboard'; // Default to dashboard
            window.location.hash = '#dashboard'; // Update URL silently if needed
        }
        loadContent(hash);
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);

    // Initial load
    handleRouteChange();

     // Make links trigger hash change
     sidebarNavLinks.forEach(link => {
         link.addEventListener('click', (e) => {
             if (link.href.includes('#')) {
                 // Let the hashchange event handle loading
                 // Close sidebar on mobile after click
                 if (window.innerWidth <= 768 && wrapper.classList.contains('toggled')) {
                     menuToggle.click(); // Simulate click to close
                 }
             } else {
                 // Handle normal links if any exist (though unlikely here)
             }
         });
     });

     // Handle card links on dashboard
     mainContent.addEventListener('click', (e) => {
        const cardLink = e.target.closest('a[data-module]');
        if(cardLink && cardLink.href.includes('#')) {
            // No need to prevent default, let the hashchange handle it
            const moduleId = cardLink.dataset.module;
            if (moduleId) {
                 // Optional: If you want instant feedback before hashchange fires
                 // loadContent(moduleId);
            }
        }
     });

});
