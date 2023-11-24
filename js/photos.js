import { getRandomUniqueElements } from './util.js';
import { METHODS } from './filters.js';

const QUANTITY_RANDOM_PHOTOS = 10;

const photos = new (function () {
  this.initialize = function (data) {
    this.data = data.slice();
  };
  this[METHODS[0]] = function () {
    return this.data;
  };
  this[METHODS[1]] = function () {
    return getRandomUniqueElements(this.data, QUANTITY_RANDOM_PHOTOS);
  };
  this[METHODS[2]] = function () {
    return this.data
      .slice()
      .sort((prev, next) => next.comments.length - prev.comments.length);
  };
})();

export { photos };
