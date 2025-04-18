document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleText = document.getElementById('theme-toggle-text');
    const themeToggleIcon = themeToggle.querySelector('i');

    // 1. Sidenav Toggle
    if (menuToggle && wrapper) {
        menuToggle.addEventListener('click', () => {
            wrapper.classList.toggle('toggled');
        });
    }

    // 2. Theme Toggle
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    // Aplica tema salvată la încărcare
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
             document.body.classList.add('dark-mode'); // Adaugă și pe body dacă e necesar pt alte librarii
            updateThemeToggleUI(true);
        } else {
            updateThemeToggleUI(false);
        }
    } else {
         // Default to light if no preference saved
         updateThemeToggleUI(false);
    }


    function updateThemeToggleUI(isDarkMode) {
         if(isDarkMode) {
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
            themeToggleText.textContent = 'Mod Luminos';
         } else {
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
            themeToggleText.textContent = 'Mod Întunecat';
         }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let isDark = false;

            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                 document.body.classList.remove('dark-mode');
                localStorage.removeItem('theme');
                isDark = false;

            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                 document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                 isDark = true;
            }
            updateThemeToggleUI(isDark);
        });
    }

     // 3. Active state for sidebar links (Optional basic version)
     // This is very basic, only highlights exact matches.
     // For real routing, you'd use a more robust solution.
     const sidebarLinks = document.querySelectorAll('#sidenav .btn-toggle-nav a');
     const currentLocation = window.location.href;

     sidebarLinks.forEach(link => {
         if (link.href === currentLocation) {
             link.classList.add('active'); // You might need to style '.active' in CSS

             // Try to expand the parent collapse section if a child is active
              let collapseElement = link.closest('.collapse');
              if (collapseElement) {
                 let collapseInstance = bootstrap.Collapse.getOrCreateInstance(collapseElement);
                 collapseInstance.show();
                 // Also toggle the button associated with it
                 let button = document.querySelector(`[data-bs-target="#${collapseElement.id}"]`);
                 if(button) {
                     button.setAttribute('aria-expanded', 'true');
                     button.classList.remove('collapsed');
                 }
              }
         }
     });


});
