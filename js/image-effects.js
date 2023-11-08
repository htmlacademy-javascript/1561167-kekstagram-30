const effectsOptions = {
  none: {
    filter: '',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    unit: '',
  },
};

const uploadForm = document.querySelector('.img-upload__form');
const effectLevelValueParent = uploadForm.querySelector(
  '.img-upload__effect-level'
);
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const imageEffectPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');

let effectType = '';

const getEffectOptionsByType = (value) => effectsOptions[value];

const onEffectsFieldsClick = (evt) => {
  const target = evt.target.closest('.effects__radio');

  if (target === null || effectType === target.value) {
    return;
  }

  effectType = target.value;

  const {
    range: { min, max },
    start,
    step,
  } = getEffectOptionsByType(effectType);
  sliderElement.noUiSlider.updateOptions({ range: { min, max }, start, step });
};

const onSliderElementUpdate = () => {
  const { filter, unit } = getEffectOptionsByType(effectType);
  const effectLevel = sliderElement.noUiSlider.get();

  if (effectType === 'none') {
    effectLevelValue.value = '';
    imageEffectPreview.style.filter = '';
    sliderElement.setAttribute('disabled', true);
    effectLevelValueParent.classList.add('hidden');
    return;
  }
  sliderElement.removeAttribute('disabled');
  effectLevelValueParent.classList.remove('hidden');
  effectLevelValue.value = effectLevel;
  imageEffectPreview.style.filter = `${filter}(${effectLevel}${unit})`;
};

const InitImageEffect = () => {
  const {
    range: { min, max },
    start,
    step,
  } = getEffectOptionsByType('none');

  effectType = 'none';
  noUiSlider.create(sliderElement, {
    range: {
      min,
      max,
    },
    start,
    step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.setAttribute('disabled', true);
  sliderElement.noUiSlider.on('update', onSliderElementUpdate);

  effectsList.addEventListener('click', onEffectsFieldsClick);
};

const resetImageEffect = () => {
  imageEffectPreview.style.filter = '';
  effectLevelValueParent.classList.remove('hidden');
  sliderElement.noUiSlider.destroy();
  effectsList.removeEventListener('click', onEffectsFieldsClick);
};

export { InitImageEffect, resetImageEffect };
