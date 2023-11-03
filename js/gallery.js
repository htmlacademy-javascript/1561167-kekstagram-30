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
  renderThumbnails(photos);
  const thumbnails = photosList.querySelectorAll('.picture');

  photosList.addEventListener('click', (evt) => {
    const targetPicture = evt.target.closest('.picture');
    if (!targetPicture) {
      return;
    }
    const index = [...thumbnails].indexOf(targetPicture);

    fullSizeModeCloseElement.addEventListener('click', onFullSizeModeClose, {
      once: true,
    });
    document.addEventListener('keydown', onFullSizeModeEscapeKeydown);

    showFullSizeMode(photos[index]);
  });
};

export { renderingGallery };
