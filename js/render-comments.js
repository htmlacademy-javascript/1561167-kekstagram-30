import { createElementFromTemplate } from './util';

const bigPictureNode = document.querySelector('.big-picture');
const commentsListNode = bigPictureNode.querySelector('.social__comments');
const shownCountNode = bigPictureNode.querySelector(
  '.social__comment-shown-count'
);
const totalCountNode = bigPictureNode.querySelector(
  '.social__comment-total-count'
);
const buttonLoaderNode = bigPictureNode.querySelector('.comments-loader');
const getNode = createElementFromTemplate('#comment', '.social__comment');

const getCommentElement = ({ avatar, name, message }) => {
  const commentNode = getNode();
  const avatarNode = commentNode.querySelector('.social__picture');

  avatarNode.src = avatar;
  avatarNode.alt = name;
  commentNode.querySelector('.social__text').textContent = message;
  return commentNode;
};

const renderComments = (count, arrayComments) => {
  const comments = arrayComments.slice(0, count);
  const isLengthsMatch = comments.length === arrayComments.length;

  commentsListNode.textContent = '';
  commentsListNode.append(...comments.map(getCommentElement));

  shownCountNode.textContent = comments.length;
  totalCountNode.textContent = arrayComments.length;
  buttonLoaderNode.classList[isLengthsMatch ? 'add' : 'remove']('hidden');
};

export { renderComments };
