// src/app/binded-content-toggle.ts
export function initializeBindedContentToggle() {
    const clickToggles = document.querySelectorAll('[data-binded-content]');

    // Get target element siblings
    const getSiblings = (elem: Element): Element[] => {
        let siblings: Element[] = [];
        let sibling = elem.parentNode?.firstChild as Element | null;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling as Element | null;
        }
        return siblings;
    };

    // Change binded content function
    const changeBindedContent = (target: string) => {
        const targetEl = document.querySelector(target);
        if (!targetEl) return;

        const targetSiblings = getSiblings(targetEl);

        targetSiblings.forEach((sibling) => {
            sibling.classList.remove('active');
        });

        targetEl.classList.add('active');
    };

    // Change binded content on click
    clickToggles.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            const target = (e.currentTarget as HTMLElement).dataset['bindedContent'];
            if (target) {
                changeBindedContent(target);
            }
        });
    });
}
