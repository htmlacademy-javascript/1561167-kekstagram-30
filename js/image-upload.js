import { toggleModalShow, isEscapeDown } from './util.js';
import { initValidation } from './validate-field.js';
import { initImageScale, resetImageScale } from './image-scale.js';
import { initImageEffect, resetImageEffect } from './image-effects.js';
import { sendData } from './data.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const ACCEPTABLE_FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
const ButtonCaption = {
  SEND: 'Публикую...',
  PUBLISH: 'Опубликовать',
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('.img-upload__input');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadPreview = uploadFormOverlay.querySelector(
  '.img-upload__preview img'
);
const effectsPreview = uploadFormOverlay.querySelectorAll('.effects__preview');
const uploadFormCloseElement = uploadFormOverlay.querySelector(
  '.img-upload__cancel'
);
const uploadFormSubmitElement = uploadForm.querySelector('.img-upload__submit');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const pristine = initValidation(uploadForm, hashtagsField, descriptionField);

const isTextFieldsFocused = (...textFields) =>
  textFields.some((field) => field === document.activeElement);

const isElementExists = (selector) => Boolean(document.querySelector(selector));

const onUploadFormEscapeKeydown = (evt) => {
  if (!isEscapeDown(evt)) {
    return;
  }

  if (
    !isTextFieldsFocused(hashtagsField, descriptionField) &&
    !isElementExists('.error')
  ) {
    evt.preventDefault();
    onUploadFormClose();
  }
};

const toggleStateSubmitElement = (isEnabled) => {
  uploadFormSubmitElement.textContent = isEnabled
    ? ButtonCaption.PUBLISH
    : ButtonCaption.SEND;
  uploadFormSubmitElement.disabled = !isEnabled;
};

const executeOnSuccess = () => {
  toggleStateSubmitElement(true);
  onUploadFormClose();
  showSuccessMessage();
};

const executeOnFailure = () => {
  toggleStateSubmitElement(true);
  showErrorMessage();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  toggleStateSubmitElement(false);
  sendData(executeOnSuccess, executeOnFailure, new FormData(uploadForm));
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

  uploadFormCloseElement.addEventListener('click', onUploadFormClose, {
    once: true,
  });
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  document.addEventListener('keydown', onUploadFormEscapeKeydown);

  uploadPreview.src = URL.createObjectURL(file);
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
  initImageScale();
  initImageEffect();

  toggleModalShow(uploadFormOverlay);
};

const initImageUpload = () => {
  uploadField.addEventListener('change', onUploadFormShow);
};

function onUploadFormClose() {
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  document.removeEventListener('keydown', onUploadFormEscapeKeydown);
  uploadForm.reset();
  pristine.reset();
  resetImageEffect();
  resetImageScale();
  toggleModalShow(uploadFormOverlay, false);
}

export { initImageUpload };
