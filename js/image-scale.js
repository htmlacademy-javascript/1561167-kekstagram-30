const MAXIMUM_IMAGE_SCALE = 100;
const MINIMUM_IMAGE_SCALE = 25;
const DEFAULT_VALUE_SCALE = 100;
const STEP_IMAGE_SCALE = 25;

import { CounterInRange } from './util.js';

const formNode = document.querySelector('.img-upload__form');
const scaleNode = formNode.querySelector('.img-upload__scale');
const scaleFieldNode = scaleNode.querySelector('.scale__control--value');
const effectPreviewNode = formNode.querySelector('.img-upload__preview img');

let scale;

const onChangingImageScaleClick = ({ target }) => {
  target = target.closest('.scale__control');

  if (target === null) {
    return;
  }

  scaleFieldNode.value = target.classList.contains('scale__control--bigger')
    ? `${scale.up()}%`
    : `${scale.down()}%`;
  effectPreviewNode.style.transform = `scale(${scale.get() / 100})`;
};

const initializeImageScale = () => {
  scale = new CounterInRange({
    range: { min: MINIMUM_IMAGE_SCALE, max: MAXIMUM_IMAGE_SCALE },
    start: DEFAULT_VALUE_SCALE,
    step: STEP_IMAGE_SCALE,
  });
  scaleFieldNode.value = `${scale.get()}%`;
  effectPreviewNode.style.transform = `scale(${scale.get() / 100})`;
  scaleNode.addEventListener('click', onChangingImageScaleClick);
};

const resetImageScale = () =>
  scaleNode.removeEventListener('click', onChangingImageScaleClick);

export { initializeImageScale, resetImageScale };
