import { renderComments } from './render-comments.js';

const MAXIMUM_COUNT_COMMENTS_SHOWN = 5;

const bigPicture = document.querySelector('.big-picture');
const fullSizeModeCloseElement = bigPicture.querySelector(
  '.big-picture__cancel'
);
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let onCommentsLoaderShowMore = null;

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
