import { CounterInRange } from './util.js';

const MAXIMUM_IMAGE_SCALE = 100;
const MINIMUM_IMAGE_SCALE = 25;
const DEFAULT_VALUE_SCALE = 100;
const STEP_IMAGE_SCALE = 25;

const imageUploadForm = document.querySelector('.img-upload__form');
const imgUploadScale = imageUploadForm.querySelector('.img-upload__scale');
const imageScaleField = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPpreview = imageUploadForm.querySelector(
  '.img-upload__preview img'
);

let scale;

const onChangingImageScaleClick = (evt) => {
  const target = evt.target.closest('.scale__control');

  if (target === null) {
    return;
  }

  imageScaleField.value = target.classList.contains('scale__control--bigger')
    ? `${scale.up()}%`
    : `${scale.down()}%`;
  imgUploadPpreview.style.transform = `scale(${scale.get() / 100})`;
};

const initImageScale = () => {
  imageScaleField.value = `${DEFAULT_VALUE_SCALE}%`;
  scale = new CounterInRange({
    range: { min: MINIMUM_IMAGE_SCALE, max: MAXIMUM_IMAGE_SCALE },
    start: DEFAULT_VALUE_SCALE,
    step: STEP_IMAGE_SCALE,
  });
  imgUploadPpreview.style.transform = `scale(${scale.get() / 100})`;
  imgUploadScale.addEventListener('click', onChangingImageScaleClick);
};

const resetImageScale = () =>
  imgUploadScale.removeEventListener('click', onChangingImageScaleClick);

export { initImageScale, resetImageScale };
