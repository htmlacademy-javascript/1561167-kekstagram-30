import { isEscapeDown } from './util.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showFullSizeMode, closeFullSizeMode } from './show-full-size-mode.js';
import { filters } from './filters.js';

const photosListNode = document.querySelector('.pictures');
const fullSizeModeCloseNode = document.querySelector('.big-picture__cancel');

let dataPhotos = [];

const renderingGallery = (photos) => {
  dataPhotos = photos[filters.get()]();

  renderThumbnails(dataPhotos);
};

function onFullSizeModeEscapeKeydown(evt) {
  if (!isEscapeDown(evt)) {
    return;
  }

  evt.preventDefault();
  onFullSizeModeClose();
}

function onFullSizeModeClose() {
  closeFullSizeMode();
  document.removeEventListener('keydown', onFullSizeModeEscapeKeydown);
}

photosListNode.addEventListener('click', ({ target }) => {
  const thumbnailTarget = target.closest('.picture');
  if (thumbnailTarget === null) {
    return;
  }

  const thumbnailId = +thumbnailTarget.dataset.thumbnailId;
  const photo = dataPhotos.find(({ id }) => id === thumbnailId);

  fullSizeModeCloseNode.addEventListener('click', onFullSizeModeClose, {
    once: true,
  });
  document.addEventListener('keydown', onFullSizeModeEscapeKeydown);

  showFullSizeMode(photo);
});

export { renderingGallery };
