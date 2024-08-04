import SmoothScroll from 'smooth-scroll';

export default function InitSmoothScroll() {
    /* eslint-disable no-unused-vars, no-undef */
    const selector = '[data-scroll]',
        fixedHeader = '[data-scroll-header]',
        scroll = new SmoothScroll(selector, {
            speed: 800,
            speedAsDuration: true,
            offset: (anchor, toggle) => {
                //@ts-ignore
                return toggle!.dataset!.scrollOffset || 20;
            },
            header: fixedHeader,
            updateURL: false,
        });
    /* eslint-enable no-unused-vars, no-undef */
}
