import { createPhotos } from './data.js';
import { renderingGallery } from './gallery.js';
import { initImageUpload } from './image-upload.js';

renderingGallery(createPhotos());
initImageUpload();
