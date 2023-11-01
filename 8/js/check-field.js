const MAXIMUM_NUMBER_HASHTAGS = 5;
const MAXIMUM_DESCRIPTION_LENGTH = 140;

const checkField = (value, cb) => cb(value);

const checkHashtagsField = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter((item) => !!item);
  // console.log('checkHashtagsField  hashtags:', hashtags);
  const regExpHashteg = /^#[a-zа-яё0-9]{1,19}$/i;
  const isValidHashtag = hashtags.every((hashtag) =>
    regExpHashteg.test(hashtag)
  );
  // console.log('checkHashtagsField  isValidHashtag:', isValidHashtag);
  const uniqueHashtags = new Set(hashtags);
  // console.log('checkHashtagsField  uniqueHashtags:', uniqueHashtags);
  let errorMessage = '';

  if (!isValidHashtag) {
    errorMessage += 'введён невалидный хэш-тег;';
  }
  if (hashtags.length > MAXIMUM_NUMBER_HASHTAGS) {
    errorMessage += ' превышено количество хэш-тегов;';
  }
  if (uniqueHashtags.size !== hashtags.length) {
    errorMessage += ' хэш-теги повторяются.';
  }
  // console.log('checkHashtagsField  errorMessage:', errorMessage);

  return errorMessage.trimStart();
};

const checkDescriptionField = (values) => {
  const description = values.trim();

  if (description.length > MAXIMUM_DESCRIPTION_LENGTH) {
    return 'длина комментария больше 140 символов.';
  }

  return '';
};

export { checkField, checkHashtagsField, checkDescriptionField };
