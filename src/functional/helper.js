export function isInputNotEmpty(input) {
  return !isInputEmpty(input);
}

export function isInputEmpty(input) {
  return input.value.trim() ? false : true;
}

export function emptyInput(input) {
  input.value = "";
}
