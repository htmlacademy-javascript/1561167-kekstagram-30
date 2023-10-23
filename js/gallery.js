import { isPushEscape } from './util.js';
import {
  containerPhotos,
  renderingThumbnails,
} from './rendering-thumbnails.js';
import {
  showFullSizeMode,
  closeFullSizeMode,
  fullSizeModeCancelElement,
} from './show-full-size-mode.js';

const removeHandlers = () => {
  document.removeEventListener('keydown', onFullSizeModePushEscape);
  fullSizeModeCancelElement.removeEventListener('click', onFullSizeModeCancel);
};
function onFullSizeModePushEscape(evt) {
  if (!isPushEscape(evt)) {
    return;
  }

  evt.preventDefault();
  closeFullSizeMode();
  removeHandlers();
}
function onFullSizeModeCancel() {
  closeFullSizeMode();
  removeHandlers();
}
const gallery = (photos) => {
  renderingThumbnails(photos);
  const thumbnails = containerPhotos.querySelectorAll('.picture');

  containerPhotos.addEventListener('click', (evt) => {
    const targetPicture = evt.target.closest('.picture');
    const index = [...thumbnails].indexOf(targetPicture);

    fullSizeModeCancelElement.addEventListener('click', onFullSizeModeCancel);
    document.addEventListener('keydown', onFullSizeModePushEscape);

    showFullSizeMode(photos[index]);
  });
};

export { gallery };
