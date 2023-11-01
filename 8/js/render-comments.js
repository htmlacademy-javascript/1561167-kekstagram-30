const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentShownCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const socialCommentTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');

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

export { renderComments };
