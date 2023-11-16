import { isEscapeDown } from './util.js';
import { photosList, renderThumbnails } from './render-thumbnails.js';
import {
  showFullSizeMode,
  closeFullSizeMode,
  fullSizeModeCloseElement,
} from './show-full-size-mode.js';

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
const renderingGallery = (photos) => {
  photosList.addEventListener('click', ({target}) => {
    const thumbnailTarget = target.closest('.picture');
    if (!thumbnailTarget) {
      return;
    }

    const thumbnailId = +thumbnailTarget.dataset.thumbnailId;
    const photo = photos.find(({ id }) => id === thumbnailId);

    fullSizeModeCloseElement.addEventListener('click', onFullSizeModeClose, {
      once: true,
    });
    document.addEventListener('keydown', onFullSizeModeEscapeKeydown);

    showFullSizeMode(photo);
  });

  renderThumbnails(photos);
};

export { renderingGallery };
