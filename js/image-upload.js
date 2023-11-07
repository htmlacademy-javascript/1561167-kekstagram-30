import { toggleModalShow, isEscapeDown } from './util.js';
import { initValidation } from './validate-field.js';
import { initImageScale, resetImageScale } from './image-scale.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('.img-upload__input');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFormCloseElement = uploadFormOverlay.querySelector(
  '.img-upload__cancel'
);
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const pristine = initValidation(uploadForm, hashtagsField, descriptionField);

const isTextFieldsFocused = (...textFields) =>
  textFields.some((field) => field === document.activeElement);

const onUploadFormEscapeKeydown = (evt) => {
  if (!isEscapeDown(evt)) {
    return;
  }
  if (!isTextFieldsFocused(hashtagsField, descriptionField)) {
    evt.preventDefault();
    onUploadFormClose();
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  // uploadForm.submit();
  onUploadFormClose();
};

const onUploadFormShow = () => {
  uploadFormCloseElement.addEventListener('click', onUploadFormClose, {
    once: true,
  });
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  document.addEventListener('keydown', onUploadFormEscapeKeydown);

  initImageScale();

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
  resetImageScale();
  toggleModalShow(uploadFormOverlay, false);
}

export { initImageUpload };
