const TEMPLATE_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/;
const MAXIMUM_QUANTITY_HASHTAGS = 5;
const MAXIMUM_DESCRIPTION_LENGTH = 140;
const StatusMessage = {
  INCORRECT:
    'хэш-тег должен начинаться с #, быть длинной до 20 символов и состоять из букв и цифр;',
  RESTRICTION: 'можно указать не более 5 хэш-тегов;',
  REPEATED: 'хэш-теги повторяются.',
  LENGTH: `длина комментария больше ${MAXIMUM_DESCRIPTION_LENGTH} символов.`,
};

let errorMessage = {};

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
  const { INCORRECT, RESTRICTION, REPEATED } = StatusMessage;

  if (!isValidHashtags) {
    errorMessage.valid = INCORRECT;
  }
  if (isMoreLimitedHashtags) {
    errorMessage.limited = RESTRICTION;
  }
  if (!isUniqueHashtags) {
    errorMessage.repeated = REPEATED;
  }

  return isValidHashtags && !isMoreLimitedHashtags && isUniqueHashtags;
};

const getHashtagValidationErrors = () => {
  const message = Object.values(errorMessage).join(' ');
  errorMessage = {};
  return message;
};

const getDescriptionValidationErrors = () => StatusMessage.LENGTH;

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
