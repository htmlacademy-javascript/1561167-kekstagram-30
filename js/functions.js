// Функция для проверки длины строки
const checkLengthStr = (str, maxLength) => str.length <= maxLength;

// Функция для проверки, является ли строка палиндромом
const toFormatStr = (param) => String(param).replaceAll(' ', '').toLowerCase();

const isPalindrom1 = (param) => {
  const str = toFormatStr(param);

  return str === str.split('').reverse().join('');
};

const isPalindrom2 = (param) => {
  const str = toFormatStr(param);

  let reverseStr = '';
  for (let i = str.length - 1; i >= 0; --i) {
    reverseStr += str[i];
  }

  return param === reverseStr;
};

const isPalindrom3 = (param) => {
  const str = toFormatStr(param);
  let startCh = 0;
  let endCh = str.length - 1;
  let result = true;

  while (result && startCh !== endCh) {
    result = str[startCh++] === str[endCh--];
  }

  return result;
};

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

const getNumFromStr = (param) => {
  let chrNum = '';
  const str = param.toString();

  for (let i = 0; i < str.length; ++i) {
    if ('0123456789'.includes(str[i])) {
      chrNum += str[i];
    }
  }

  return parseInt(chrNum);
};
