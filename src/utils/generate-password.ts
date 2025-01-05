import { autoGenerateDefaultOptions } from "./constants";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const CAPITALS = LOWERCASE.toUpperCase();
const DIGITS = "01234567890123456789";
const SPECIAL_CHARS = "!?#%$:;_-,*^~+=/&€@<>";

export const generatePassword = (options = autoGenerateDefaultOptions) => {
  let result = "";
  const { length, includesUpperCase, includesSpecialChars, includesDigits } =
    options;
  let base = LOWERCASE;
  if (includesUpperCase) base += CAPITALS;
  if (includesDigits) base += DIGITS;
  if (includesSpecialChars) base += SPECIAL_CHARS;
  const toArray = base.split("");
  const arrayLength = toArray.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * arrayLength);
    result += toArray[randomIndex];
  }
  return result;
};
