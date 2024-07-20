import axios from 'axios';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showError, showInfo } from './js/render-functions.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const loadingIndicator = document.getElementById('loading');
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.getElementById('load-more');
const searchForm = document.querySelector(".search-form");
// const imageCard = document.querySelector(".image-card");

let queryValue = "";
let page = 1;
const perPage = 15;


const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });



searchForm.addEventListener("submit", handlerSubmit);
async function handlerSubmit(event) {
    event.preventDefault();

    // const form = event.currentTarget;
    // const queryValue = form.elements.query.value;
    queryValue = event.currentTarget.elements.query.value;
    if (!queryValue) {
        showError("Please enter something!");
        return;
    }

    // gallery.innerHTML = '';
    page = 1;
    loadingIndicator.style.display = 'block';
    loadMoreButton.style.display = 'none';

    try {
        const data = await fetchImages(queryValue, page, perPage);
        if (data.hits.length === 0) {
            showInfo('Sorry, there are no images matching your search query. Please try again!');
        } else {
            renderGallery(data.hits, true);
            lightbox.refresh();
            if (data.hits.length === perPage) {
                setTimeout(() => {
                    loadMoreButton.style.display = 'block';
                }, 300);
            }
        }
    } catch (error) {
        showError('An error occurred while fetching images. Please try again later.');
    } finally {
        loadingIndicator.style.display = 'none';
        searchForm.reset();
    }


    // fetchImages(queryValue)
    //     .then(data => {
    //         if (data.hits.length === 0) {
    //             showInfo('Sorry, there are no images matching your search query. Please try again!');
    //         } else {
    //             renderGallery(data.hits);
    //             lightbox.refresh();
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         showError('An error occurred while fetching images. Please try again later.')
    //     })
    //     .finally(() => {
    //         loadingIndicator.style.display = 'none';
    //         form.reset()
    //     });
} 

loadMoreButton.addEventListener("click", handlerLoadMore);
async function handlerLoadMore() {
    page += 1;
    loadMoreButton.style.display = 'none';
    loadingIndicator.style.display = 'block';

    try {
        const data = await fetchImages(queryValue, page, perPage);
        renderGallery(data.hits, false);
        lightbox.refresh();
        setTimeout(() => {
            loadMoreButton.style.display = 'block';
        }, 300);

        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

        if (data.hits.length < perPage) {
            showInfo("We're sorry, but you've reached the end of search results.");
            setTimeout(() => {
                loadMoreButton.style.display = 'none';
            }, 300);
            loadMoreButton.removeEventListener("click", handlerLoadMore);
        }
    } catch (error) {
        showError('An error occurred while fetching images. Please try again later.');
    } finally {
        loadingIndicator.style.display = 'none';
    }
}