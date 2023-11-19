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

const formNode = document.querySelector('.img-upload__form');
const effectLevelNode = formNode.querySelector('.img-upload__effect-level');
const effectLevelFieldNode = formNode.querySelector('.effect-level__value');
const sliderNode = formNode.querySelector('.effect-level__slider');
const effectPreviewNode = formNode.querySelector('.img-upload__preview img');
const effectsListNode = formNode.querySelector('.effects__list');

let effectType = '';

const getEffectOptionsByType = (value) => effectsOptions[value];

const onEffectsFieldsClick = ({ target }) => {
  target = target.closest('.effects__radio');

  if (target === null || effectType === target.value) {
    return;
  }

  effectType = target.value;

  const {
    range: { min, max },
    start,
    step,
  } = getEffectOptionsByType(effectType);
  sliderNode.noUiSlider.updateOptions({ range: { min, max }, start, step });
};

const onsliderNodeUpdate = () => {
  const { filter, unit } = getEffectOptionsByType(effectType);
  const effectLevel = sliderNode.noUiSlider.get();

  if (effectType === 'none') {
    effectLevelFieldNode.value = '';
    effectPreviewNode.style.filter = '';
    sliderNode.setAttribute('disabled', true);
    effectLevelNode.classList.add('hidden');
    return;
  }
  sliderNode.removeAttribute('disabled');
  effectLevelNode.classList.remove('hidden');
  effectLevelFieldNode.value = effectLevel;
  effectPreviewNode.style.filter = `${filter}(${effectLevel}${unit})`;
};

const initializeImageEffect = () => {
  const {
    range: { min, max },
    start,
    step,
  } = getEffectOptionsByType('none');

  effectType = 'none';
  noUiSlider.create(sliderNode, {
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

  sliderNode.setAttribute('disabled', true);
  sliderNode.noUiSlider.on('update', onsliderNodeUpdate);

  effectsListNode.addEventListener('click', onEffectsFieldsClick);
};

const resetImageEffect = () => {
  effectPreviewNode.style.filter = '';
  effectLevelNode.classList.remove('hidden');
  sliderNode.noUiSlider.destroy();
  effectsListNode.removeEventListener('click', onEffectsFieldsClick);
};

export { initializeImageEffect, resetImageEffect };
