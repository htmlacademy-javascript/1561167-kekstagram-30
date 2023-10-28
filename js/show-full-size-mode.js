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
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');

let onCommentsLoaderShowMore = null;

const getCommentElement = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);
  const avatarElement = commentElement.querySelector('.social__picture');

  avatarElement.src = avatar;
  avatarElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};
// TODO: вынести в отдельный модуль
const renderComments = (count, arrayComments) => {
  const comments = arrayComments.slice(0, count);
  const isLengthsMatch = comments.length === arrayComments.length;

  commentsList.textContent = '';
  commentsList.append(...comments.map(getCommentElement));

  socialCommentShownCount.textContent = comments.length;
  socialCommentTotalCount.textContent = arrayComments.length;
  commentsLoader.classList[isLengthsMatch ? 'add' : 'remove']('hidden');
};
const handlerShowMore = (shownCount, comments) => () => {
  shownCount += MAXIMUM_COUNT_COMMENTS_SHOWN;
  renderComments(shownCount, comments);
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

  renderComments(commentShownCount, comments);
  onCommentsLoaderShowMore = handlerShowMore(commentShownCount, comments);
  commentsLoader.addEventListener('click', onCommentsLoaderShowMore);

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

export { showFullSizeMode, closeFullSizeMode, fullSizeModeCloseElement };
