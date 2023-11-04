const MAXIMUM_NUMBER_HASHTAGS = 5;
const MAXIMUM_DESCRIPTION_LENGTH = 140;

const checkField = (value, cb) => cb(value);

const checkHashtagsField = (value) => {
  // TODO: использовать плагин /vendor/pristine
  const hashtags = value
    .trim()
    .split(' ')
    .filter((item) => item !== '');
  const regExpHashteg = /^#[a-zа-яё0-9]{1,19}$/i;
  const isValidHashtag = hashtags.every((hashtag) =>
    regExpHashteg.test(hashtag)
  );
  const uniqueHashtags = new Set(hashtags);
  let errorMessage = '';

  if (!isValidHashtag) {
    errorMessage +=
      'хэш-тег дожен начинаться с #, быть длинной до 20 символов и состоять только из букв и цифр;';
  }
  if (hashtags.length > MAXIMUM_NUMBER_HASHTAGS) {
    errorMessage += ' можно указать не более 5 хэш-тегов;';
  }
  if (uniqueHashtags.size !== hashtags.length) {
    errorMessage += ' хэш-теги повторяются.';
  }

  return errorMessage.trimStart();
};

const checkDescriptionField = (values) => {
  // TODO: использовать плагин /vendor/pristine
  const description = values.trim();

  if (description.length > MAXIMUM_DESCRIPTION_LENGTH) {
    return 'длина комментария больше 140 символов.';
  }

  return '';
};

export { checkField, checkHashtagsField, checkDescriptionField };
