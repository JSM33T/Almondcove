import Shuffle from "shufflejs";
import imagesLoaded from "imagesloaded";

export function InitMasonryGrid(): () => void {
    const grids = document.querySelectorAll<HTMLElement>('.masonry-grid');

    if (!grids.length) return () => {}; // Return an empty cleanup function if no grids are found

    const cleanups: Array<() => void> = [];

    grids.forEach(grid => {
        const masonry = new Shuffle(grid, {
            itemSelector: '.masonry-grid-item',
            sizer: '.masonry-grid-item',
        });

        // Wait for images to be loaded before layout
        imagesLoaded(grid).on('progress', () => {
            masonry.layout();
        });

        // Filtering
        const filtersWrap = grid.closest('.masonry-filterable') as HTMLElement | null;
        if (!filtersWrap) return;

        const filters = filtersWrap.querySelectorAll<HTMLElement>('.masonry-filters [data-group]');
        filters.forEach(filter => {
            const handleClick = (e: Event) => {
                e.preventDefault();

                const currentActive = filtersWrap.querySelector<HTMLElement>('.masonry-filters .active');
                const target = (filter as HTMLElement).dataset['group']; // Use bracket notation

                if (currentActive) {
                    currentActive.classList.remove('active');
                }

                (filter as HTMLElement).classList.add('active');
                if (target) {
                    masonry.filter(target);
                }
            };

            filter.addEventListener('click', handleClick);

            // Add cleanup function for this filter
            cleanups.push(() => {
                filter.removeEventListener('click', handleClick);
            });
        });
    });

    // Return cleanup function
    return () => {
        cleanups.forEach(cleanup => cleanup());
    };
}
