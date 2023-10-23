const containerPhotos = document.querySelector('.pictures');

const renderingThumbnails = (photos) => {
  const templatePhoto = document
    .querySelector('#picture')
    ?.content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
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

export { renderingThumbnails, containerPhotos };
