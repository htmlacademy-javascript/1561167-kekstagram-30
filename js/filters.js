const ACCEPTABLE_FILTERS = ['default', 'random', 'likes'];

const section = document.querySelector('.img-filters');

const filters = new (function () {
  this.form = section.querySelector('.img-filters__form');
  this.buttons = this.form.querySelectorAll('.img-filters__button');
  this.init = function () {
    [...this.buttons]
      .slice(0, ACCEPTABLE_FILTERS.length)
      .forEach((button, index) => {
        button.dataset.imageFilter = ACCEPTABLE_FILTERS[index];
        if (button.classList.contains('img-filters__button--active')) {
          this.filter = button.dataset.imageFilter;
        }
      });
    if (this.filter === undefined) {
      this.buttons[0].classList.add('img-filters__button--active');
      this.filter = ACCEPTABLE_FILTERS[0];
    }
    // console.log('filters  this.filter:', this.filter);
    section.classList.remove('img-filters--inactive');
  };
  this.active = function () {
    return this.filter;
  };
  this.setClick = function (cb) {
    this.form.addEventListener('click', ({ target }) => {
      target = target.closest('.img-filters__button');

      if (target === null) {
        return;
      }

      const isAcceptable = ACCEPTABLE_FILTERS.some(
        (filter) => filter === target.dataset.imageFilter
      );
      this.buttons.forEach((button) =>
        button.classList.remove('img-filters__button--active')
      );
      target.classList.add('img-filters__button--active');
      this.filter = isAcceptable
        ? target.dataset.imageFilter
        : ACCEPTABLE_FILTERS[0];
      cb();
    });
  };
})();

export { filters };
