const ACCEPTABLE_FILTERS = ['default', 'random', 'likes'];

const section = document.querySelector('.img-filters');
const form = section.querySelector('.img-filters__form');
const buttons = form.querySelectorAll('.img-filters__button');

const isActiveButton = (button) =>
  button.classList.contains('img-filters__button--active');

const setActiveButton = (button) =>
  button.classList.add('img-filters__button--active');

const showFiltersSection = () =>
  section.classList.remove('img-filters--inactive');

const deactivateButtons = () =>
  buttons.forEach((button) =>
    button.classList.remove('img-filters__button--active')
  );

const filters = new (function () {
  this.init = function () {
    const maximumFilters = Math.min(buttons.length, ACCEPTABLE_FILTERS.length);

    [...buttons].slice(0, maximumFilters).forEach((button, index) => {
      button.dataset.photosFilter = ACCEPTABLE_FILTERS[index];
      if (isActiveButton(button)) {
        this.filter = button.dataset.photosFilter;
      }
    });
    if (this.filter === undefined) {
      setActiveButton(buttons[0]);
      this.filter = ACCEPTABLE_FILTERS[0];
    }
    showFiltersSection();
  };
  this.active = function () {
    return this.filter;
  };
  this.setClick = function (cb) {
    form.addEventListener('click', ({ target }) => {
      target = target.closest('.img-filters__button');
      if (target === null) {
        return;
      }

      const isAcceptable = ACCEPTABLE_FILTERS.some(
        (filter) => filter === target.dataset.photosFilter
      );
      const activeButton = isAcceptable ? target : buttons[0];

      this.filter = isAcceptable
        ? target.dataset.photosFilter
        : ACCEPTABLE_FILTERS[0];
      deactivateButtons();
      setActiveButton(activeButton);
      cb();
    });
  };
})();

export { filters };
