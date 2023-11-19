const ACCEPTABLE_FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
const ButtonCaption = {
  SEND: 'Публикую...',
  PUBLISH: 'Опубликовать',
};

import { toggleModalShow, isEscapeDown } from './util.js';
import { initializeValidation } from './validate-field.js';
import { initializeImageScale, resetImageScale } from './image-scale.js';
import { initializeImageEffect, resetImageEffect } from './image-effects.js';
import { sendData } from './data.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const formNode = document.querySelector('.img-upload__form');
const uploadField = formNode.querySelector('.img-upload__input');
const overlayNode = formNode.querySelector('.img-upload__overlay');
const previewNode = overlayNode.querySelector('.img-upload__preview img');
const effectsPreviewNodes = overlayNode.querySelectorAll('.effects__preview');
const formCloseNode = overlayNode.querySelector('.img-upload__cancel');
const formSubmitNode = formNode.querySelector('.img-upload__submit');
const hashtagFieldNode = formNode.querySelector('.text__hashtags');
const descriptionFieldNode = formNode.querySelector('.text__description');

const pristine = initializeValidation(
  formNode,
  hashtagFieldNode,
  descriptionFieldNode
);

const isTextFieldsFocused = (...textFields) =>
  textFields.some((field) => field === document.activeElement);

const isNodeExists = (selector) => Boolean(document.querySelector(selector));

const onUploadFormEscapeKeydown = (evt) => {
  if (!isEscapeDown(evt)) {
    return;
  }

  if (
    !isTextFieldsFocused(hashtagFieldNode, descriptionFieldNode) &&
    !isNodeExists('.error')
  ) {
    evt.preventDefault();
    onUploadFormCloseClick();
  }
};

const toggleStateSubmitElement = (isDisabled) => {
  formSubmitNode.textContent = isDisabled
    ? ButtonCaption.SEND
    : ButtonCaption.PUBLISH;
  formSubmitNode.disabled = isDisabled;
};

const executeOnSuccess = () => {
  onUploadFormCloseClick();
  showSuccessMessage();
  toggleStateSubmitElement(false);
};

const executeOnFailure = () => {
  showErrorMessage();
  toggleStateSubmitElement(false);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  toggleStateSubmitElement(true);
  sendData(executeOnSuccess, executeOnFailure, new FormData(formNode));
};

const onUploadFormShow = () => {
  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();
  const isAcceptable = ACCEPTABLE_FILE_EXTENSIONS.some((item) =>
    fileName.endsWith(item)
  );

  if (!isAcceptable) {
    showErrorMessage(
      `Ошибка! Выбери файл с расширением ${ACCEPTABLE_FILE_EXTENSIONS.join(
        ', '
      )}`
    );
    return;
  }

  formCloseNode.addEventListener('click', onUploadFormCloseClick, {
    once: true,
  });
  formNode.addEventListener('submit', onUploadFormSubmit);
  document.addEventListener('keydown', onUploadFormEscapeKeydown);

  previewNode.src = URL.createObjectURL(file);
  effectsPreviewNodes.forEach((item) => {
    item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
  initializeImageScale();
  initializeImageEffect();
  toggleModalShow(overlayNode);
};

const initializeImageUpload = () => {
  uploadField.addEventListener('change', onUploadFormShow);
};

function onUploadFormCloseClick() {
  formNode.removeEventListener('submit', onUploadFormSubmit);
  document.removeEventListener('keydown', onUploadFormEscapeKeydown);
  formNode.reset();
  pristine.reset();
  resetImageEffect();
  resetImageScale();
  toggleModalShow(overlayNode, false);
}

export { initializeImageUpload };
