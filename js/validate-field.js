const MAXIMUM_NUMBER_HASHTAGS = 5;
const MAXIMUM_DESCRIPTION_LENGTH = 140;

let errorMessages = {};

const validateDescriptionField = (value) =>
  value.length >= 0 && value.length <= MAXIMUM_DESCRIPTION_LENGTH;

const validateHashtagField = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter((item) => item !== '');
  const regExpHashteg = /^#[a-zа-яё0-9]{1,19}$/i;
  const isValidHashtags = hashtags.every((item) => regExpHashteg.test(item));
  const isNumberHashtags = hashtags.length <= MAXIMUM_NUMBER_HASHTAGS;
  const uniqueHashtags = new Set();
  hashtags.forEach((item) => uniqueHashtags.add(item));
  const isUniqueHashtags = hashtags.length === uniqueHashtags.size;

  errorMessages = {};
  if (!isValidHashtags) {
    errorMessages.valid =
      'хэш-тег должен начинаеться с #, быть длинной до 20 символов и состоять из букв и цифр;';
    return isValidHashtags;
  }
  if (!isNumberHashtags) {
    errorMessages.number = 'можно указать не более 5 хэш-тегов;';
    return isNumberHashtags;
  }
  if (!isUniqueHashtags) {
    errorMessages.unique = 'хэш-теги повторяются.';
  }

  return isUniqueHashtags;
};

const getHashtagValidationErrors = () => Object.values(errorMessages).join(' ');

const eraseValidationErrors = (...elements) => {
  const parents = elements.map((item) => item.parentElement);

  parents.forEach((parent) => {
    if (!parent.classList.contains('img-upload__field-wrapper--error')) {
      return;
    }

    parent.classList.remove('img-upload__field-wrapper--error');
    parent.lastElementChild.remove();
  });
};

const initValidation = (
  validatedFormElement,
  validatedHashtagElement,
  validatedDescriptionElement
) => {
  const pristine = new Pristine(validatedFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'field-error',
  });

  pristine.addValidator(
    validatedHashtagElement,
    validateHashtagField,
    getHashtagValidationErrors
  );
  pristine.addValidator(
    validatedDescriptionElement,
    validateDescriptionField,
    'длина комментария больше 140 символов.'
  );
  eraseValidationErrors(validatedHashtagElement, validatedDescriptionElement);

  return pristine;
};

export { initValidation };
