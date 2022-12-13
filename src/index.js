console.log('faina_super_dog');

import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputSearchForm: document.querySelector('input'),
  buttonSearchForm: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  button_load: document.querySelector('.load-more'),
};

const options = {
  key: '?key=31970566-78c0d9aee70a01d48504dc051',
  q: '',
  image_type: 'image_type=photo',
  orientation: 'orientation=horizontal',
  safesearch: 'safesearch=true',
  perPage: 'per_page=40',
};

const BASE_URL = 'https://pixabay.com/api';
let items = '';
let page = 1;
let show = 0;

refs.inputSearchForm.addEventListener('input', onText);
refs.buttonSearchForm.addEventListener('click', createNewMarcup);
refs.button_load.addEventListener('click', moreMarcup);

function onText() {
  options.q = `q=${refs.inputSearchForm.value.trim()}`;
}

function createNewMarcup(evt) {
  evt.preventDefault();

  page = 1;
  show = 40;

  clear();
  onFetch();
}

function moreMarcup() {
  page++;
  if (show > items.totalHits) {
    refs.button_load.classList.add('hidden');
    return notifyFailTwo();
  }
  show += 40;
  onFetch();
}

function clear() {
  refs.gallery.innerHTML = '';
}

function onFetch() {
  fetch(
    `${BASE_URL}/${options.key}&${options.orientation}&${options.q}&${options.safesearch}&${options.image_type}&${options.perPage}&page=${page}`
  )
    .then(res => {
      return res.json();
    })
    .then(obj => {
      items = obj;

      console.log(`totalHits: ${items.totalHits}`);
      console.log('+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+');

      if (items.total === 0) {
        return notifyFail();
      } else {
        notifySuccess();
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
        refs.button_load.classList.remove('hidden');
      }
    });
}

function notifyFail() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function notifyFailTwo() {
  Notify.failure("We're sorry, but you've reached the end of search results.");
}

function notifySuccess() {
  Notify.success(`Hooray! We found ${items.totalHits} images.`);
}
