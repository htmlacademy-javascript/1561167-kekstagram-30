import { getRandomUniqueElements } from './util.js';

const QUANTITY_RANDOM_PHOTOS = 10;

const photos = new (function () {
  this.init = function (data) {
    this.data = data.slice();
  };
  this.default = function () {
    return this.data;
  };
  this.random = function () {
    return getRandomUniqueElements(this.data, QUANTITY_RANDOM_PHOTOS);
  };
  this.likes = function () {
    return this.data
      .slice()
      .sort((prev, next) => next.comments.length - prev.comments.length);
  };
})();

export { photos };
