import { renderingGallery } from './gallery.js';
import { initImageUpload } from './image-upload.js';
import { getData } from './data.js';
import { showLoadErrorMessage } from './message.js';

const executeOnSuccess = (photos) => renderingGallery(photos);

const executeOnFailure = () => showLoadErrorMessage();

getData(executeOnSuccess, executeOnFailure);
initImageUpload();
