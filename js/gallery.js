import { isEscapeDown } from './util.js';
import {
  containerPhotos,
  renderingThumbnails,
} from './rendering-thumbnails.js';
import {
  showFullSizeMode,
  closeFullSizeMode,
  fullSizeModeCloseElement,
} from './show-full-size-mode.js';

function onFullSizeModePushEscape(evt) {
  if (!isEscapeDown(evt)) {
    return;
  }

  evt.preventDefault();
  onFullSizeModeClose();
}
function onFullSizeModeClose() {
  closeFullSizeMode();
  document.removeEventListener('keydown', onFullSizeModePushEscape);
}
const renderingGallery = (photos) => {
  renderingThumbnails(photos);
  const thumbnails = containerPhotos.querySelectorAll('.picture');

  containerPhotos.addEventListener('click', (evt) => {
    const targetPicture = evt.target.closest('.picture');
    const index = [...thumbnails].indexOf(targetPicture);

    fullSizeModeCloseElement.addEventListener('click', onFullSizeModeClose, {
      once: true,
    });
    document.addEventListener('keydown', onFullSizeModePushEscape);

    showFullSizeMode(photos[index]);
  });
};

export { renderingGallery };
