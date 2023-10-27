const containerPhotos = document.querySelector('.pictures');

// TODO: сделать функцию, которая будет создавать только одну фотку
const renderingThumbnails = (photos) => {
  const templatePhoto = document
    .querySelector('#picture')
    ?.content.querySelector('.picture');
  // TODO: использовать append вместо фрагмента
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
