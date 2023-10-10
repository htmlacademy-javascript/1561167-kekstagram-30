// Функция для проверки длины строки
const checkLengthString = (str, maxLength) => str.length <= maxLength;

// Функция для проверки, является ли строка палиндромом
const formatString = (str) => String(str).replaceAll(' ', '').toLowerCase();

const isPalindrom1 = (str) => {
  str = formatString(str);

  return str === str.split('').reverse().join('');
};

const isPalindrom2 = (str) => {
  str = formatString(str);

  let reverseStr = '';
  for (let i = str.length - 1; i >= 0; --i) {
    reverseStr += str[i];
  }

  return str === reverseStr;
};

const isPalindrom3 = (str) => {
  str = formatString(str);

  let startCh = 0;
  let endCh = str.length - 1;
  let result = true;

  while (result && startCh !== endCh) {
    result = str[startCh++] === str[endCh--];
  }

  return result;
};

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

const getNumberFromString = (str) =>
  Number(str.toString().match(/\d/g)?.join(''));
