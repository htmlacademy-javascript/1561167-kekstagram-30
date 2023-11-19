const QUANTITY_RANDOM_PHOTOS = 10;

import { getRandomUniqueElements } from './util.js';
import { ACCEPTABLE_FILTERS } from './filters.js';

const photos = new (function () {
  this.initialize = function (data) {
    this.data = data.slice();
  };
  this[ACCEPTABLE_FILTERS[0]] = function () {
    return this.data;
  };
  this[ACCEPTABLE_FILTERS[1]] = function () {
    return getRandomUniqueElements(this.data, QUANTITY_RANDOM_PHOTOS);
  };
  this[ACCEPTABLE_FILTERS[2]] = function () {
    return this.data
      .slice()
      .sort((prev, next) => next.comments.length - prev.comments.length);
  };
})();

export { photos };
