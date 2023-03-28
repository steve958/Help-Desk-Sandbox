export const checkValidity = (value: string, pattern: RegExp): boolean => {
  let isValid = true;
  if (value !== "") isValid = pattern.test(value) && isValid;
  return isValid;
};
