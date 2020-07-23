export function isInputNotEmpty(input) {
  return !isInputEmpty(input);
}

export function isInputEmpty(input) {
  return input.value.trim() ? false : true;
}

export function emptyInput(input) {
  input.value = "";
}

export function confirmDelete() {
  return window.confirm("Sure you wanna delete item?");
}
