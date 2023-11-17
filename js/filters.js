const ACCEPTABLE_FILTERS = ['default', 'random', 'likes'];

const sectionNode = document.querySelector('.img-filters');
const formNode = sectionNode.querySelector('.img-filters__form');
const buttonNodes = formNode.querySelectorAll('.img-filters__button');

const isActiveButton = (node) =>
  node.classList.contains('img-filters__button--active');

const setActiveButton = (node) =>
  node.classList.add('img-filters__button--active');

const showFiltersSection = () =>
  sectionNode.classList.remove('img-filters--inactive');

const deactivateButtons = () =>
  buttonNodes.forEach((node) =>
    node.classList.remove('img-filters__button--active')
  );

const filters = new (function () {
  this.init = function () {
    const maximumFilters = Math.min(
      buttonNodes.length,
      ACCEPTABLE_FILTERS.length
    );

    [...buttonNodes].slice(0, maximumFilters).forEach((buttonNode, index) => {
      buttonNode.dataset.photosFilter = ACCEPTABLE_FILTERS[index];
      if (isActiveButton(buttonNode)) {
        this.filter = buttonNode.dataset.photosFilter;
      }
    });
    if (this.filter === undefined) {
      setActiveButton(buttonNodes[0]);
      this.filter = ACCEPTABLE_FILTERS[0];
    }
    showFiltersSection();
  };
  this.active = function () {
    return this.filter;
  };
  this.setClick = function (cb) {
    formNode.addEventListener('click', ({ target }) => {
      const targetNode = target.closest('.img-filters__button');
      if (targetNode === null) {
        return;
      }

      const isAcceptable = ACCEPTABLE_FILTERS.some(
        (filter) => filter === targetNode.dataset.photosFilter
      );
      const activeButton = isAcceptable ? targetNode : buttonNodes[0];

      this.filter = isAcceptable
        ? targetNode.dataset.photosFilter
        : ACCEPTABLE_FILTERS[0];
      deactivateButtons();
      setActiveButton(activeButton);
      cb();
    });
  };
})();

export { filters };
