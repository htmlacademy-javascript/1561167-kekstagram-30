const bigPicture = document.querySelector('.big-picture');
const fullSizeModeCancelElement = bigPicture.querySelector(
  '.big-picture__cancel'
);
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentShownCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const socialCommentTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeFullSizeMode = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const getCommentHTML = ({ avatar, name, message }) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;

const showFullSizeMode = ({ url, likes, comments, description }) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  socialComments.textContent = '';
  socialComments.insertAdjacentHTML(
    'beforeend',
    comments.map(getCommentHTML).join('')
  );

  socialCommentShownCount.textContent = comments.length;
  socialCommentTotalCount.textContent = comments.length;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

export { showFullSizeMode, closeFullSizeMode, fullSizeModeCancelElement };
