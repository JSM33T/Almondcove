//@ts-nocheck

let galleryInstances = [];

export function initializeLightGallery() {
    deinitializeLightGallery();
    const gallery = document.querySelectorAll('.gallery');

    if (gallery.length) {
        for (let i = 0; i < gallery.length; i++) {
            /* eslint-disable no-undef */
            const thumbnails = gallery[i].dataset.thumbnails ? true : false,
                  video = gallery[i].dataset.video ? true : false,
                  defaultPlugins = [lgZoom, lgFullscreen],
                  videoPlugin = video ? [lgVideo] : [],
                  thumbnailPlugin = thumbnails ? [lgThumbnail] : [],
                  plugins = [...defaultPlugins, ...videoPlugin, ...thumbnailPlugin];

            const instance = lightGallery(gallery[i], {
                selector: '.gallery-item',
                plugins: plugins,
                licenseKey: 'D4194FDD-48924833-A54AECA3-D6F8E646',
                download: false,
                autoplayVideoOnSlide: true,
                zoomFromOrigin: false,
                youtubePlayerParams: {
                    modestbranding: 1,
                    showinfo: 0,
                    rel: 0,
                },
                vimeoPlayerParams: {
                    byline: 0,
                    portrait: 0,
                    color: '6366f1',
                },
            });

            // Store the instance for potential future deinitialization
            galleryInstances.push(instance);
            /* eslint-enable no-undef */
        }
    }
}

export function deinitializeLightGallery() {
    // Deinitialize existing gallery instances
    galleryInstances.forEach(instance => {
        instance.destroy();
    });
    galleryInstances = [];
}
