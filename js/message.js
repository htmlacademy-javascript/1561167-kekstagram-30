import { getTemplateElementById, isEscapeDown } from './util.js';

const TIME_DELAY = 5000;

const showLoadErrorMessage = () => {
  const messageElement = getTemplateElementById('#data-error')();
  document.body.append(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, TIME_DELAY);
};

const hideSendingMessage = () => {
  const messageElement =
    document.querySelector('.success') ?? document.querySelector('.error');

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.body.removeEventListener('click', onBodyClick);
  messageElement.remove();
};

const onCloseButtonClick = () => hideSendingMessage();

const showSendingMessage = (selector) => {
  const messageElement = getTemplateElementById(selector)();
  const button = messageElement.querySelector('button');

  button.addEventListener('click', onCloseButtonClick, { once: true });
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.body.addEventListener('click', onBodyClick);
  document.body.append(messageElement);
};

const showSendingErrorMessage = () => showSendingMessage('#error');

const showSendingSuccessMessage = () => showSendingMessage('#success');

function onDocumentEscapeKeydown(evt) {
  if (isEscapeDown(evt)) {
    evt.preventDefault();
    hideSendingMessage();
  }
}

function onBodyClick({ target }) {
  if (target.closest('.success__inner') || target.closest('.error__inner')) {
    return;
  }
  hideSendingMessage();
}

export {
  showLoadErrorMessage,
  showSendingErrorMessage,
  showSendingSuccessMessage,
  hideSendingMessage,
};
