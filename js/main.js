import { renderingGallery } from './gallery.js';
import { initImageUpload } from './image-upload.js';
import { getData } from './data.js';
import { showErrorMessage } from './util.js';

getData(renderingGallery, showErrorMessage);
initImageUpload();
