const MAXIMUM_COUNT_COMMENTS_SHOWN = 5;

const bigPicture = document.querySelector('.big-picture');
const fullSizeModeCloseElement = bigPicture.querySelector(
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
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let onCommentsLoaderShowMore = null;

// TODO: вынести в template
const getCommentHTML = ({ avatar, name, message }) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;
// TODO: вынести в отдельный модуль
const renderNextComments = (parentComments, count, arrayComments) => {
  const comments = arrayComments.slice(0, count);

  parentComments.textContent = '';
  parentComments.insertAdjacentHTML(
    'beforeend',
    comments.map(getCommentHTML).join('')
  );
  socialCommentShownCount.textContent = comments.length;
  socialCommentTotalCount.textContent = arrayComments.length;
  if (comments.length === arrayComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};
const handlerShowMore = (parentComments, shownCount, arrayComments) => () => {
  shownCount += MAXIMUM_COUNT_COMMENTS_SHOWN;
  renderNextComments(parentComments, shownCount, arrayComments);
};

const closeFullSizeMode = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderShowMore);
};
const showFullSizeMode = ({ url, likes, comments, description }) => {
  const commentShownCount = Math.min(
    comments.length,
    MAXIMUM_COUNT_COMMENTS_SHOWN
  );
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  renderNextComments(socialComments, commentShownCount, comments);
  // socialCommentCount.classList.add('hidden');
  onCommentsLoaderShowMore = handlerShowMore(
    socialComments,
    commentShownCount,
    comments
  );
  commentsLoader.addEventListener('click', onCommentsLoaderShowMore);

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

export { showFullSizeMode, closeFullSizeMode, fullSizeModeCloseElement };
//
