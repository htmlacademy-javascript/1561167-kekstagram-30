import { renderingGallery } from './gallery.js';
import { initImageUpload } from './image-upload.js';
import { getData } from './data.js';
import { showLoadErrorMessage } from './message.js';
import { filters } from './filters.js';
import { photos } from './photos.js';
import { debounce } from './util.js';

const RENDERING_DELAY_TIME = 500;

const executeOnFailure = () => showLoadErrorMessage();

const executeOnSuccess = (data) => {
  photos.init(data);
  filters.init();
  renderingGallery(photos);
  filters.setClick(
    debounce(() => {
      renderingGallery(photos);
    }, RENDERING_DELAY_TIME)
  );
};

getData(executeOnSuccess, executeOnFailure);
initImageUpload();
