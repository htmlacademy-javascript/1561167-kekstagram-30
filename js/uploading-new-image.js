import { toggleModalShow, isEscapeDown } from './util.js';
import { initValidation } from './validate-field.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadField = imageUploadForm.querySelector('.img-upload__input');
const imageEditingForm = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditingCloseElement = imageEditingForm.querySelector(
  '.img-upload__cancel'
);
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');

let pristine;

const onTextFieldEscapeKeydown = (evt) => {
  if (!isEscapeDown(evt)) {
    return;
  }
  evt.stopPropagation();
};

const onImageEditingFormEscapeKeydown = (evt) => {
  if (!isEscapeDown(evt)) {
    return;
  }

  evt.preventDefault();
  onImageEditingFormClose();
};

const onImageEditingFormSubmit = (evt) => {
  evt.preventDefault();

  const isValidFields = pristine.validate();

  if (isValidFields) {
    // imageUploadForm.submit();
    onImageEditingFormClose();
  }
};

const onImageEditingFormShow = () => {
  imageEditingCloseElement.addEventListener('click', onImageEditingFormClose, {
    once: true,
  });
  hashtagsField.addEventListener('keydown', onTextFieldEscapeKeydown);
  descriptionField.addEventListener('keydown', onTextFieldEscapeKeydown);
  imageUploadForm.addEventListener('submit', onImageEditingFormSubmit);
  document.addEventListener('keydown', onImageEditingFormEscapeKeydown);

  imageUploadField.value = '';
  hashtagsField.value = '';
  descriptionField.value = '';

  pristine = initValidation(imageUploadForm, hashtagsField, descriptionField);

  toggleModalShow(imageEditingForm);
};

const initImageUpload = () => {
  imageUploadField.addEventListener('change', onImageEditingFormShow);
};

function onImageEditingFormClose() {
  hashtagsField.removeEventListener('keydown', onTextFieldEscapeKeydown);
  descriptionField.removeEventListener('keydown', onTextFieldEscapeKeydown);
  imageUploadForm.removeEventListener('submit', onImageEditingFormSubmit);
  document.removeEventListener('keydown', onImageEditingFormEscapeKeydown);
  toggleModalShow(imageEditingForm, false);
}

export { initImageUpload };
