// src/app/navbar-toggle.ts
export function initializeNavbarToggle() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });

        // Close navbar when clicking outside
        document.addEventListener('click', (event) => {
            if (!navbarCollapse.contains(event.target as Node) && !navbarToggler.contains(event.target as Node)) {
                navbarCollapse.classList.remove('show');
                closeAllDropdowns();
            }
        });

        // Collapse navbar when a nav-link without children is clicked
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const parentItem = link.closest('.nav-item');
                const hasDropdown = parentItem?.querySelector('.dropdown-menu');

                if (!hasDropdown) {
                    navbarCollapse.classList.remove('show');
                    closeAllDropdowns();
                }
            });
        });

        // Collapse dropdown when a dropdown-item is clicked
        const dropdownItems = navbarCollapse.querySelectorAll('.dropdown-item');
        dropdownItems.forEach((item) => {
            item.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
                closeAllDropdowns();
            });
        });

        // Collapse dropdown menus when a dropdown toggle is clicked
        const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link');
        dropdownToggles.forEach((toggle) => {
            toggle.addEventListener('click', (event) => {
                event.preventDefault();
                const currentTarget = event.currentTarget as HTMLElement;
                const dropdownMenu = currentTarget.nextElementSibling as HTMLElement;
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('show');
                }
            });
        });
    }

    function closeAllDropdowns() {
        const dropdownMenus = navbarCollapse?.querySelectorAll('.dropdown-menu');
        dropdownMenus?.forEach((menu) => {
            menu.classList.remove('show');
        });
    }
}
