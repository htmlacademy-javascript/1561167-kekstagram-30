import { switchingModalShow, isEscapeDown } from './util.js';
import {
  checkField,
  checkHashtagsField,
  checkDescriptionField,
} from './check-field.js';

import {
  renderValidationErrors,
  removeValidationErrors,
  hasValidationErrors,
} from './render_validation_errors.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadField = imageUploadForm.querySelector('.img-upload__input');
const imageEditingForm = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditingCloseElement = imageEditingForm.querySelector(
  '.img-upload__cancel'
);
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const parentFields = imageUploadForm.querySelectorAll(
  '.img-upload__field-wrapper'
);

const onImageEditingFormPushEscape = (evt) => {
  if (!isEscapeDown(evt)) {
    return;
  }

  evt.preventDefault();
  onImageEditingFormClose();
};

const onImageEditingFormSubmit = (evt) => {
  evt.preventDefault();

  if (hasValidationErrors(parentFields)) {
    // Есть ошибки.Данные не прошли валидацию. Обработка ошибок
    return false;
  }
  // Нет ошибок. Данные прошли валидацию. Отправка данных на сервер
  return true;
};

const onHashtagsFieldСhecking = (evt) => {
  const target = evt.target;
  const parentHashtagField = target.closest('.img-upload__field-wrapper');
  const errorMessage = checkField(target.value, checkHashtagsField);
  if (errorMessage) {
    renderValidationErrors(errorMessage, parentHashtagField);
  }
};

const onDescriptionFieldСhecking = (evt) => {
  const target = evt.target;
  const parentHashtagField = target.closest('.img-upload__field-wrapper');
  const errorMessage = checkField(target.value, checkDescriptionField);
  if (errorMessage) {
    renderValidationErrors(errorMessage, parentHashtagField);
  }
};

const onFieldClearErrors = (evt) => {
  const target = evt.target;
  const parentField = target.closest('.img-upload__field-wrapper');
  if (hasValidationErrors([parentField])) {
    removeValidationErrors(parentField);
  }
};

const onImageEditingFormShow = () => {
  if (!imageUploadField.value) {
    return;
  }

  imageEditingCloseElement.addEventListener('click', onImageEditingFormClose, {
    once: true,
  });
  imageUploadForm.addEventListener('submit', onImageEditingFormSubmit);
  hashtagsField.addEventListener('blur', onHashtagsFieldСhecking);
  hashtagsField.addEventListener('focus', onFieldClearErrors);
  descriptionField.addEventListener('blur', onDescriptionFieldСhecking);
  descriptionField.addEventListener('focus', onFieldClearErrors);
  document.addEventListener('keydown', onImageEditingFormPushEscape);

  imageUploadField.value = '';
  hashtagsField.value = '';
  descriptionField.value = '';
  if (hasValidationErrors(parentFields)) {
    parentFields.forEach(removeValidationErrors);
  }

  switchingModalShow(imageEditingForm);
};

function onImageEditingFormClose() {
  switchingModalShow(imageEditingForm, false);
  hashtagsField.removeEventListener('blur', onHashtagsFieldСhecking);
  hashtagsField.removeEventListener('focus', onFieldClearErrors);
  descriptionField.removeEventListener('blur', onDescriptionFieldСhecking);
  descriptionField.removeEventListener('focus', onFieldClearErrors);
  imageUploadForm.removeEventListener('submit', onImageEditingFormSubmit);
  document.removeEventListener('keydown', onImageEditingFormPushEscape);
}

const uploadingNewImage = () => {
  imageUploadField.addEventListener('change', onImageEditingFormShow);
};

export { uploadingNewImage };
