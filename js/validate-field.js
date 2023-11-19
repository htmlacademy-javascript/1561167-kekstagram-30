const TEMPLATE_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/;
const MAXIMUM_QUANTITY_HASHTAGS = 5;
const MAXIMUM_DESCRIPTION_LENGTH = 140;
const ERROR_MESSAGE_UNVALID =
  'хэш-тег должен начинаеться с #, быть длинной до 20 символов и состоять из букв и цифр;';
const ERROR_MESSAGE_MORE_LIMITED = 'можно указать не более 5 хэш-тегов;';
const ERROR_MESSAGE_REPEATED = 'хэш-теги повторяются.';
const ERROR_MESSAGE_LENGTH = `длина комментария больше ${MAXIMUM_DESCRIPTION_LENGTH} символов.`;

let errorMessages = {};

const validateDescriptionField = (value) =>
  value.length >= 0 && value.length <= MAXIMUM_DESCRIPTION_LENGTH;

const validateHashtagField = (hashtags) => {
  const normalizeHashtags = hashtags
    .trim()
    .split(' ')
    .filter((item) => item.length !== 0)
    .map((item) => item.toLowerCase());
  const isValidHashtags = normalizeHashtags.every((item) =>
    TEMPLATE_HASHTAG.test(item)
  );
  const isMoreLimitedHashtags =
    normalizeHashtags.length > MAXIMUM_QUANTITY_HASHTAGS;
  const uniqueHashtags = new Set(normalizeHashtags);
  const isUniqueHashtags = normalizeHashtags.length === uniqueHashtags.size;

  if (!isValidHashtags) {
    errorMessages.valid = ERROR_MESSAGE_UNVALID;
  }
  if (isMoreLimitedHashtags) {
    errorMessages.limited = ERROR_MESSAGE_MORE_LIMITED;
  }
  if (!isUniqueHashtags) {
    errorMessages.repeated = ERROR_MESSAGE_REPEATED;
  }

  return isValidHashtags && !isMoreLimitedHashtags && isUniqueHashtags;
};

const getHashtagValidationErrors = () => {
  const message = Object.values(errorMessages).join(' ');
  errorMessages = {};
  return message;
};

const getDescriptionValidationErrors = () => ERROR_MESSAGE_LENGTH;

const initializeValidation = (
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
    getDescriptionValidationErrors
  );

  return pristine;
};

export { initializeValidation };
