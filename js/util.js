// Возвращает произвольное целое число из диапазона min..max
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Возвращант произвольный элемент массива
const getRandomArrayElement = (array) =>
  array[getRandomNumber(0, array.length - 1)];

const isEscapeDown = (evt) => evt.key === 'Escape';

const switchingModalShow = (element, status = true) => {
  const methodElement = status ? 'remove' : 'add';
  const methodBody = status ? 'add' : 'remove';

  if (typeof status !== 'boolean') {
    return;
  }

  element.classList[methodElement]('hidden');
  document.body.classList[methodBody]('modal-open');
};

export {
  getRandomNumber,
  getRandomArrayElement,
  isEscapeDown,
  switchingModalShow,
};
