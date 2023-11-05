const photosList = document.querySelector('.pictures');
const photoTemplate = document
  .querySelector('#picture')
  ?.content.querySelector('.picture');

const getThumbnailElement = ({ id, url, description, likes, comments }) => {
  const photoElement = photoTemplate.cloneNode(true);
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
