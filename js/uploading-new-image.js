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

const onImageEditingFormEscapeKeydown = (evt) => {
  if (!isEscapeDown(evt)) {
    return;
  }

  evt.preventDefault();
  onImageEditingFormClose();
};

const onImageEditingFormSubmit = (evt) => {
  evt.preventDefault();

  const isValidField = pristine.validate();

  if (isValidField) {
    // TODO: Отправка формы
    onImageEditingFormClose();
  } else {
    // TODO: Ошибки. Отправка не возможна
  }
};

const onImageEditingFormShow = () => {
  imageEditingCloseElement.addEventListener('click', onImageEditingFormClose, {
    once: true,
  });
  hashtagsField.addEventListener('focus', onFieldEscapeKeydown);
  descriptionField.addEventListener('focus', onFieldEscapeKeydown);
  imageUploadForm.addEventListener('submit', onImageEditingFormSubmit);
  document.addEventListener('keydown', onImageEditingFormEscapeKeydown);

  imageUploadField.value = '';
  hashtagsField.value = '';
  descriptionField.value = '';
  pristine = initValidation(imageUploadForm, hashtagsField, descriptionField);
  toggleModalShow(imageEditingForm);
};

const uploadingNewImage = () => {
  imageUploadField.addEventListener('change', onImageEditingFormShow);
};

function onImageEditingFormClose() {
  hashtagsField.removeEventListener('focus', onFieldEscapeKeydown);
  descriptionField.removeEventListener('focus', onFieldEscapeKeydown);
  imageUploadForm.removeEventListener('submit', onImageEditingFormSubmit);
  document.removeEventListener('keydown', onImageEditingFormEscapeKeydown);
  toggleModalShow(imageEditingForm, false);
}

function onFieldEscapeKeydown() {
  this.addEventListener('keydown', (evt) => {
    if (!isEscapeDown(evt)) {
      return;
    }
    evt.stopPropagation();
  });
}

export { uploadingNewImage };
