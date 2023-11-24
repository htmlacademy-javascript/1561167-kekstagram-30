const isEscapeDown = (evt) => evt.key === 'Escape';

const toggleModalShow = (element, isModalOpen = true) => {
  const methodElement = isModalOpen ? 'remove' : 'add';
  const methodBody = isModalOpen ? 'add' : 'remove';

  element.classList[methodElement]('hidden');
  document.body.classList[methodBody]('modal-open');
};

const replaceFirstCharacter = (string) => `.${string.slice(1, string.length)}`;

const createElementFromTemplate = (selector, contentSelector = '') => {
  if (contentSelector.length === 0) {
    contentSelector = replaceFirstCharacter(selector);
  }
  const templateNode = document
    .querySelector(selector)
    .content.querySelector(contentSelector);

  return () => templateNode.cloneNode(true);
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomUniqueNumber = (min, max) => {
  const array = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index
  );

  return () => {
    const index = getRandomNumber(0, array.length - 1);

    if (array.length !== 0) {
      return array.splice(index, 1)[0];
    }

    return null;
  };
};

const getRandomUniqueElements = (array, quantity) => {
  const Elements = [];
  const getUniqueIndex = generateRandomUniqueNumber(0, array.length - 1);

  quantity = Math.min(quantity, array.length);
  for (let i = 0; i < quantity; i++) {
    Elements.push(array[getUniqueIndex()]);
  }
  return Elements;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// функция конструктор
function CounterInRange({ range: { min, max }, start, step }) {
  this.get = function () {
    return start;
  };
  this.up = function () {
    start = Math.min(start + step, max);
    return start;
  };
  this.down = function () {
    start = Math.max(start - step, min);
    return start;
  };
}

export {
  isEscapeDown,
  toggleModalShow,
  CounterInRange,
  createElementFromTemplate,
  replaceFirstCharacter,
  getRandomUniqueElements,
  debounce,
};
