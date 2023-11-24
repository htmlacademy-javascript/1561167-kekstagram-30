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
const previewNode = formNode.querySelector('.img-upload__preview img');
const listNode = formNode.querySelector('.effects__list');

let effectType = 'none';

const getOptionsByType = (value) => effectsOptions[value];

const updateSlider = ({ range: { min, max }, start, step }) =>
  sliderNode.noUiSlider.updateOptions({ range: { min, max }, start, step });

const onListClick = ({ target }) => {
  target = target.closest('.effects__radio');

  if (target === null || effectType === target.value) {
    return;
  }

  effectType = target.value;
  updateSlider(getOptionsByType(effectType));
};

const onSliderUpdate = () => {
  const { filter, unit } = getOptionsByType(effectType);
  const effectLevel = sliderNode.noUiSlider.get();

  if (effectType === 'none') {
    effectLevelFieldNode.value = '';
    previewNode.style.filter = '';
    sliderNode.setAttribute('disabled', 'true');
    effectLevelNode.classList.add('hidden');
    return;
  }
  sliderNode.removeAttribute('disabled');
  effectLevelNode.classList.remove('hidden');
  effectLevelFieldNode.value = effectLevel;
  previewNode.style.filter = `${filter}(${effectLevel}${unit})`;
};

const initializeImageEffect = () => {
  effectType = 'none';
  sliderNode.setAttribute('disabled', 'true');
  updateSlider(getOptionsByType(effectType));
  listNode.addEventListener('click', onListClick);
};

const resetImageEffect = () => {
  previewNode.style.filter = '';
  effectLevelNode.classList.remove('hidden');
  listNode.removeEventListener('click', onListClick);
};

const {
  range: { min: minRage, max: maxRange },
  start: startValue,
  step: stepValue,
} = getOptionsByType(effectType);

noUiSlider.create(sliderNode, {
  range: { min: minRage, max: maxRange },
  start: startValue,
  step: stepValue,
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
sliderNode.noUiSlider.on('update', onSliderUpdate);

export { initializeImageEffect, resetImageEffect };
