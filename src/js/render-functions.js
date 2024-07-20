import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight'
    });
}

export function showInfo(message) {
    iziToast.info({
        title: 'Info',
        message: message,
        position: 'topRight'
    });
}

export function renderGallery(images, clear = true) {
    const gallery = document.querySelector('.gallery');
    if (clear) {
        gallery.innerHTML = '';
    }

    const galleryContent = images.map(image => `
        <a href="${image.largeImageURL}" class="gallery-item">
            <div class="image-card">
                <img src="${image.webformatURL}" alt="${image.tags}">
                <div class="info">
                    <p>Likes ${image.likes}</p>
                    <p>Views ${image.views}</p>
                    <p>Comments ${image.comments}</p>
                    <p>Downloads ${image.downloads}</p>
                </div>
            </div>
        </a>
    `).join('');

    // gallery.innerHTML = galleryContent;
    gallery.insertAdjacentHTML('beforeend', galleryContent);
}