const METHODS = ['default', 'random', 'likes'];

const sectionNode = document.querySelector('.img-filters');
const formNode = sectionNode.querySelector('.img-filters__form');
const buttonsNodes = formNode.querySelectorAll('.img-filters__button');

const isActiveButton = (node) =>
  node.classList.contains('img-filters__button--active');

const setActiveButton = (node) =>
  node.classList.add('img-filters__button--active');

const showFiltersSection = () =>
  sectionNode.classList.remove('img-filters--inactive');

const deactivateButtons = () =>
  buttonsNodes.forEach((button) =>
    button.classList.remove('img-filters__button--active')
  );

const filters = new (function () {
  this.initialize = function () {
    [...buttonsNodes].forEach((button, index) => {
      button.dataset.photosFilter = METHODS[index];
      if (isActiveButton(button)) {
        this.filter = METHODS[index];
      }
    });
    if (this.filter === undefined) {
      setActiveButton(buttonsNodes[0]);
      this.filter = METHODS[0];
    }
    showFiltersSection();
  };
  this.get = function () {
    return this.filter;
  };
  this.setFormListener = function (cb) {
    formNode.addEventListener('click', ({ target }) => {
      const targetNode = target.closest('.img-filters__button');
      if (targetNode === null) {
        return;
      }

      this.filter = targetNode.dataset.photosFilter;
      deactivateButtons();
      setActiveButton(targetNode);
      cb();
    });
  };
})();

export { filters, METHODS };
