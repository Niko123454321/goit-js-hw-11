console.log('faina_super_dog');

import './css/styles.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputSearchForm: document.querySelector('input'),
  buttonSearchForm: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
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

refs.inputSearchForm.addEventListener('input', onText);
refs.buttonSearchForm.addEventListener('click', onSubmit);

function onText() {
  options.q = `q=${refs.inputSearchForm.value.trim()}`;
}

function onSubmit(evt) {
  evt.preventDefault();
  // console.log(
  //   `${BASE_URL}/${options.key}&${options.orientation}&${options.q}&${options.safesearch}&${options.image_type}`
  // );
  fetch(
    `${BASE_URL}/${options.key}&${options.orientation}&${options.q}&${options.safesearch}&${options.image_type}&${options.perPage}`
  )
    .then(res => {
      return res.json();
    })
    .then(obj => {
      items = obj;
      clear();
      items.hits.forEach(element => {
        refs.gallery.insertAdjacentHTML(
          'beforeend',
          `<div class="photo-card">
    <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes <br>${element.likes}</br></b>
      </p>
      <p class="info-item">
        <b>Views <br>${element.views}</br></b>
      </p>
      <p class="info-item">
        <b>Comments <br>${element.comments}</br></b>
      </p>
      <p class="info-item">
        <b>Downloads <br>${element.downloads}</br></b>
      </p>
    </div>
  </div>`
        );
      });
    });
}

function clear() {
  refs.gallery.innerHTML = '';
}

function onGallery() {
  refs.gallery.innerHTML = '';
}
