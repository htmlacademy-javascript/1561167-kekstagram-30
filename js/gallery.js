import { isEscapeDown } from './util.js';
import { photosList, renderThumbnails } from './render-thumbnails.js';
import {
  showFullSizeMode,
  closeFullSizeMode,
  fullSizeModeCloseElement,
} from './show-full-size-mode.js';
import { filters } from './filters.js';

let dataPhotos = [];

const renderingGallery = (photos) => {
  dataPhotos = photos[filters.active()]();

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

photosList.addEventListener('click', ({ target }) => {
  const thumbnailTarget = target.closest('.picture');
  if (thumbnailTarget === null) {
    return;
  }

  const thumbnailId = +thumbnailTarget.dataset.thumbnailId;
  const photo = dataPhotos.find(({ id }) => id === thumbnailId);

  fullSizeModeCloseElement.addEventListener('click', onFullSizeModeClose, {
    once: true,
  });
  document.addEventListener('keydown', onFullSizeModeEscapeKeydown);

  showFullSizeMode(photo);
});

export { renderingGallery };
