import { getTemplateElementById } from './util';

const photosList = document.querySelector('.pictures');

const getThumbnailElement = ({ id, url, description, likes, comments }) => {
  const photoElement = getTemplateElementById('#picture');
  const pictureImg = photoElement.querySelector('.picture__img');

  pictureImg.src = url;
  pictureImg.alt = description;
  photoElement.querySelector('.picture__comments').textContent =
    comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.dataset.thumbnailId = id;

  return photoElement;
};

const renderThumbnails = (photos) =>
  photosList.append(...photos.map(getThumbnailElement));

export { renderThumbnails, photosList };
