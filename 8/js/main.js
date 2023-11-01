import { createPhotos } from './data.js';
import { renderingGallery } from './gallery.js';
import { uploadingNewImage } from './uploading-new-image.js';

renderingGallery(createPhotos());
uploadingNewImage();
