import { createElementFromTemplate } from './util';

const photosListNode = document.querySelector('.pictures');
const getNode = createElementFromTemplate('#picture');

const getThumbnailElement = ({ id, url, description, likes, comments }) => {
  const photoNode = getNode();
  const imgNode = photoNode.querySelector('.picture__img');

  imgNode.src = url;
  imgNode.alt = description;
  photoNode.querySelector('.picture__comments').textContent = comments.length;
  photoNode.querySelector('.picture__likes').textContent = likes;
  photoNode.dataset.thumbnailId = id;

  return photoNode;
};

const renderThumbnails = (photos) => {
  [...photosListNode.children].forEach((element) => {
    if (element.classList.contains('picture')) {
      element.remove();
    }
  });
  photosListNode.append(...photos.map(getThumbnailElement));
};

export { renderThumbnails };
