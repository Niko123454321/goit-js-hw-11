console.log('faina_super_dog');

import './css/styles.css';
import './feath.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputSearchForm: document.querySelector('input'),
  buttonSearchForm: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  button_load: document.querySelector('.load-more'),
};

let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

let items = '';
let page = 1;
let show = 0;

refs.inputSearchForm.addEventListener('input', onText);
refs.buttonSearchForm.addEventListener('click', createNewMarcup);
refs.button_load.addEventListener('click', moreMarcup);

function createNewMarcup(evt) {
  evt.preventDefault();

  page = 1;

  clear();
  if (refs.inputSearchForm.value.trim() === '') {
    return notifyFail();
  }
  onFetch();
  show = 40;
}

function moreMarcup() {
  page++;
  show += items.hits.length;

  if (show > items.totalHits) {
    notifyInfo();
  }
  onFetch();
}

async function onFetch() {
  try {
    const response = await axios.get(
      `${options.BASE_URL}/${options.key}&${options.orientation}&${options.q}&${options.safesearch}&${options.image_type}&${options.perPage}&page=${page}`
    );

    items = response.data;

    console.log(`totalHits: ${items.totalHits}`);
    console.log('+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+');

    if (items.total === 0) {
      return notifyFail();
    } else {
      notifySuccess();
      renderMarkup();

      lightbox.refresh();
    }

    if (items.totalHits > show) {
      remove_button_load_hidden();
    } else {
      add_button_load_hidden();
    }
  } catch (error) {
    console.error(error.massage);
  }
}

function renderMarkup() {
  items.hits.forEach(element => {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      `<div class="photo-card">
          <a href="${element.webformatURL}" >
    <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes <span class="box">${element.likes}</span></b>
      </p>
      <p class="info-item">
        <b>Views <span class="box">${element.views}</span></b>
      </p>
      <p class="info-item">
        <b>Comments <span class="box">${element.comments}</span></b>
      </p>
      <p class="info-item">
        <b>Downloads <span class="box">${element.downloads}</span></b>
      </p>
    </div>
  </div>`
    );
  });
}

function onText() {
  options.q = `q=${refs.inputSearchForm.value.trim()}`;
}

function clear() {
  refs.gallery.innerHTML = '';
}

function notifyFail() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function notifyInfo() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

function notifySuccess() {
  Notify.success(`Hooray! We found ${items.totalHits} images.`);
}

function remove_button_load_hidden() {
  refs.button_load.classList.remove('hidden');
}

function add_button_load_hidden() {
  refs.button_load.classList.add('hidden');
}
