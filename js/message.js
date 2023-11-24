import { createElementFromTemplate, isEscapeDown } from './util.js';

const TIME_DELAY = 5000;

const showLoadErrorMessage = () => {
  const messageNode = createElementFromTemplate('#data-error')();
  document.body.append(messageNode);

  setTimeout(() => {
    messageNode.remove();
  }, TIME_DELAY);
};

const hideMessage = () => {
  const messageNode =
    document.querySelector('.success') ?? document.querySelector('.error');

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.body.removeEventListener('click', onBodyClick);
  messageNode.remove();
};

const onCloseButtonClick = () => hideMessage();

const showMessage = (selector, title = null) => {
  const messageNode = createElementFromTemplate(selector)();
  const titleNode = messageNode.querySelector('.error__title');
  const buttonNode = messageNode.querySelector('button');

  if (title !== null) {
    titleNode.textContent = title;
  }
  buttonNode.addEventListener('click', onCloseButtonClick, { once: true });
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.body.addEventListener('click', onBodyClick);
  document.body.append(messageNode);
};

const showErrorMessage = (title = 'Ошибка загрузки файла') =>
  showMessage('#error', title);

const showSuccessMessage = () => showMessage('#success');

function onDocumentEscapeKeydown(evt) {
  if (isEscapeDown(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick({ target }) {
  if (target.closest('.success__inner') || target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

export {
  showLoadErrorMessage,
  showErrorMessage,
  showSuccessMessage,
  hideMessage,
};
