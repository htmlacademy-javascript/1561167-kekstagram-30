import { createPhotos } from './data.js';

const renderingThumbnails = () => {
  const templatePhoto = document
    .querySelector('#picture')
    ?.content.querySelector('.picture');
  const containerPhotos = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  createPhotos().forEach(({ url, description, likes, comments }) => {
    const photo = templatePhoto.cloneNode(true);
    const pictureImg = photo.querySelector('.picture__img');

    pictureImg.src = url;
    pictureImg.alt = description;
    photo.querySelector('.picture__comments').textContent = comments.length;
    photo.querySelector('.picture__likes').textContent = likes;
    fragment.appendChild(photo);
  });

  containerPhotos.appendChild(fragment);
};

export { renderingThumbnails };
