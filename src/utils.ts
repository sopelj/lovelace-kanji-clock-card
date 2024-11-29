import { KANJI_NUMBERS, TENS } from "./const";

export const convertNumberToKanji = (number: number): string => {
  let output = "";
  const length = number.toString().length;

  for (let i = length - 1; i >= 0; i--) {
    const divisor = Math.pow(10, i);
    const prefix = Math.floor(number / divisor);
    const digit = prefix % 10;
    if ((digit > 1 && digit < 10) || (digit === 1 && (i === 0 || i >= 4))) {
      output += KANJI_NUMBERS[digit];
    }
    if (digit > 0) {
      output += TENS[i];
    }
  }
  return output;
};
