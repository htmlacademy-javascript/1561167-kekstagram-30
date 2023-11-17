import { createElementFromTemplate, isEscapeDown } from './util.js';

const TIME_DELAY = 5000;

const showLoadErrorMessage = () => {
  const messageElement = createElementFromTemplate('#data-error')();
  document.body.append(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, TIME_DELAY);
};

const hideMessage = () => {
  const messageElement =
    document.querySelector('.success') ?? document.querySelector('.error');

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.body.removeEventListener('click', onBodyClick);
  messageElement.remove();
};

const onCloseButtonClick = () => hideMessage();

const showMessage = (selector, title = null) => {
  const messageElement = createElementFromTemplate(selector)();
  const titleElement = messageElement.querySelector('.error__title');
  const button = messageElement.querySelector('button');

  titleElement.textContent = title ?? 'Ошибка';
  button.addEventListener('click', onCloseButtonClick, { once: true });
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.body.addEventListener('click', onBodyClick);
  document.body.append(messageElement);
};
//
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
