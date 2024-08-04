// import Parallax from 'parallax-js';

// export default function initParallax() {
//     const element = document.querySelectorAll('.parallax');
//     /* eslint-disable no-unused-vars, no-undef */
//     for (let i = 0; i < element.length; i++) {
//         // @ts-ignore
//         const parallaxInstance = new Parallax(element[i]);
//     }
// }

import Parallax from 'parallax-js';

let parallaxInstances: Parallax[] = [];

export function initParallax() {
    const elements = document.querySelectorAll('.parallax');
    console.log(`Found ${elements.length} parallax elements.`);
    for (let i = 0; i < elements.length; i++) {
        // @ts-ignore
        const parallaxInstance = new Parallax(elements[i]);
        parallaxInstances.push(parallaxInstance);
        console.log(`Initialized parallax for element ${i}`);
    }
}

export function destroyParallax() {
    console.log(`Destroying ${parallaxInstances.length} parallax instances.`);
    for (let i = 0; i < parallaxInstances.length; i++) {
        parallaxInstances[i].destroy();
        console.log(`Destroyed parallax instance ${i}`);
    }
    parallaxInstances = [];
}

// Assuming you have a way to trigger these functions, such as on route change or component lifecycle methods
// Example usage:
// initParallax(); // to initialize
// destroyParallax(); // to destroy
