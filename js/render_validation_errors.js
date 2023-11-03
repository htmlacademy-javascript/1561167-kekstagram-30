const renderValidationErrors = (errorMessage, parentElement) => {
  const errorElement = document.createElement('p');

  errorElement.textContent = errorMessage;
  parentElement.classList.add('img-upload__field-wrapper--error');
  parentElement.append(errorElement);
};

const removeValidationErrors = (parent) => {
  parent.classList.remove('img-upload__field-wrapper--error');
  parent.children.at(-1)?.remove();
};

const hasValidationErrors = (parentFields) =>
  [...parentFields].some((parent) =>
    parent.classList.contains('img-upload__field-wrapper--error')
  );

export { renderValidationErrors, removeValidationErrors, hasValidationErrors };
