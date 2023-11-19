const MAXIMUM_COUNT_COMMENTS_SHOWN = 5;

import { toggleModalShow } from './util.js';
import { renderComments } from './render-comments.js';

const bigPictureNode = document.querySelector('.big-picture');
const imageNode = bigPictureNode.querySelector('.big-picture__img img');
const countLikesNode = bigPictureNode.querySelector('.likes-count');
const socialCaptionNode = bigPictureNode.querySelector('.social__caption');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

let onCommentsLoaderShowMore;

const getShowMoreHandler = (shownCount, comments) => () => {
  shownCount += MAXIMUM_COUNT_COMMENTS_SHOWN;
  renderComments(shownCount, comments);
};

const closeFullSizeMode = () => {
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoaderNode.removeEventListener('click', onCommentsLoaderShowMore);
};

const showFullSizeMode = ({ url, likes, comments, description }) => {
  const commentShownCount = Math.min(
    comments.length,
    MAXIMUM_COUNT_COMMENTS_SHOWN
  );
  imageNode.src = url;
  countLikesNode.textContent = likes;
  socialCaptionNode.textContent = description;

  renderComments(commentShownCount, comments);
  onCommentsLoaderShowMore = getShowMoreHandler(commentShownCount, comments);
  commentsLoaderNode.addEventListener('click', onCommentsLoaderShowMore);

  toggleModalShow(bigPictureNode);
};

export { showFullSizeMode, closeFullSizeMode };
