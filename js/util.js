// Возвращает произвольное целое число из диапазона min..max
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Возвращант произвольный элемент массива
const getRandomArrayElement = (array) =>
  array[getRandomNumber(0, array.length - 1)];

const isEscapeDown = (evt) => evt.key === 'Escape';

const toggleModalShow = (element, isModalOpen = true) => {
  const methodElement = isModalOpen ? 'remove' : 'add';
  const methodBody = isModalOpen ? 'add' : 'remove';

  element.classList[methodElement]('hidden');
  document.body.classList[methodBody]('modal-open');
};

export {
  getRandomNumber,
  getRandomArrayElement,
  isEscapeDown,
  toggleModalShow,
};