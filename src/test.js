async function onFetch() {
  try {
    const response = await axios.get(
      `${BASE_URL}/${options.key}&${options.orientation}&${options.q}&${options.safesearch}&${options.image_type}&${options.perPage}&page=${page}`
    );
    console.log(response.data);
    items = response.data;
    console.log('items ', items);
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
      var lightbox = new SimpleLightbox('.gallery a', {
        /* options */
      });
      lightbox.refresh();
      refs.button_load.classList.remove('hidden');
    }
  } catch (error) {
    console.error(error);
  }
}
