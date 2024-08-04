// src/app/navbar-sticky.ts
export function initializeNavbarSticky() {
    const navbar = document.querySelector('.navbar.fixed-top');

    if (navbar == null) return;

    const navbarClass = navbar.classList;
    const scrollOffset = 20;

    const navbarStuck = (e: Event) => {
        const currentTarget = e.currentTarget as Window;
        if (currentTarget.pageYOffset > scrollOffset) {
            navbarClass.add('navbar-stuck');
        } else {
            navbarClass.remove('navbar-stuck');
        }
    };

    // On load
    window.addEventListener('load', (e) => {
        navbarStuck(e);
    });

    // On scroll
    window.addEventListener('scroll', (e) => {
        navbarStuck(e);
    });
}
