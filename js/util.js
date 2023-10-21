// Возвращает произвольное целое число из диапазона min..max
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Возвращант произвольный элемент массива
const getRandomArrayElement = (array) =>
  array[getRandomNumber(0, array.length - 1)];

const isPushEscape = (evt) => evt.key === 'Escape';

export { getRandomNumber, getRandomArrayElement, isPushEscape };
