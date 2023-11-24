import { renderGallery } from './gallery.js';
import { initializeImageUpload } from './image-upload.js';
import { getData } from './data.js';
import { showLoadErrorMessage } from './message.js';
import { filters } from './filters.js';
import { photos } from './photos.js';
import { debounce } from './util.js';

const RENDERING_DELAY_TIME = 660;

const executeOnFailure = () => showLoadErrorMessage();

const executeOnSuccess = (data) => {
  photos.initialize(data);
  filters.initialize();
  renderGallery(photos);
  filters.setFormListener(
    debounce(() => renderGallery(photos), RENDERING_DELAY_TIME)
  );
};

getData(executeOnSuccess, executeOnFailure);
initializeImageUpload();
