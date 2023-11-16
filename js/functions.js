// Функция для проверки длины строки
const checkLengthString = (str, maxLength) => str.length <= maxLength;
checkLengthString('hello', 10);

// Функция для проверки, является ли строка палиндромом
const normalizeString = (str) => String(str).replaceAll(' ', '').toLowerCase();

const isPalindrom1 = (str) => {
  str = normalizeString(str);

  return str === str.split('').reverse().join('');
};
isPalindrom1('pop');

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

const getNumberFromString = (str) =>
  Number(str.toString().match(/\d/g)?.join(''));
getNumberFromString('10qwerty20');
