const isEscapeDown = (evt) => evt.key === 'Escape';

const toggleModalShow = (element, isModalOpen = true) => {
  const methodElement = isModalOpen ? 'remove' : 'add';
  const methodBody = isModalOpen ? 'add' : 'remove';

  element.classList[methodElement]('hidden');
  document.body.classList[methodBody]('modal-open');
};

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

const replaceFirstCharacter = (string) => `.${string.slice(1, string.length)}`;

const createElementFromTemplate = (selector, contentSelector = '') => {
  if (contentSelector.length === 0) {
    contentSelector = replaceFirstCharacter(selector);
  }
  const templateElement = document
    .querySelector(selector)
    .content.querySelector(contentSelector);

  return () => templateElement.cloneNode(true);
};

export {
  isEscapeDown,
  toggleModalShow,
  CounterInRange,
  createElementFromTemplate,
  replaceFirstCharacter,
};
