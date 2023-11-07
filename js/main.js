import { createPhotos } from './data.js';
import { renderingGallery } from './gallery.js';
import { initImageUpload } from './uploading-new-image.js';

renderingGallery(createPhotos());
initImageUpload();
