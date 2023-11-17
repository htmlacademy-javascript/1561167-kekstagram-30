import { createElementFromTemplate } from './util';

const photosList = document.querySelector('.pictures');
const getTemplateElement = createElementFromTemplate('#picture');

const getThumbnailElement = ({ id, url, description, likes, comments }) => {
  const photoElement = getTemplateElement();
  const pictureImg = photoElement.querySelector('.picture__img');

  pictureImg.src = url;
  pictureImg.alt = description;
  photoElement.querySelector('.picture__comments').textContent =
    comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.dataset.thumbnailId = id;

  return photoElement;
};

const renderThumbnails = (photos) => {
  [...photosList.children].forEach((element) => {
    if (element.classList.contains('picture')) {
      element.remove();
    }
  });
  photosList.append(...photos.map(getThumbnailElement));
};

export { renderThumbnails, photosList };
