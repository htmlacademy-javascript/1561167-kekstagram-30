import { getTemplateElementById } from './util';

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentShownCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const socialCommentTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const commentsLoader = bigPicture.querySelector('.comments-loader');

const getCommentElement = ({ avatar, name, message }) => {
  const commentElement = getTemplateElementById('#comment', '.social__comment');
  const avatarElement = commentElement.querySelector('.social__picture');

  avatarElement.src = avatar;
  avatarElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const renderComments = (count, arrayComments) => {
  const comments = arrayComments.slice(0, count);
  const isLengthsMatch = comments.length === arrayComments.length;

  commentsList.textContent = '';
  commentsList.append(...comments.map(getCommentElement));

  socialCommentShownCount.textContent = comments.length;
  socialCommentTotalCount.textContent = arrayComments.length;
  commentsLoader.classList[isLengthsMatch ? 'add' : 'remove']('hidden');
};

export { renderComments };
