export default class TodoItem {
  constructor(value, done, priority) {
    this.value = value;
    this.done = done;
    this.priority = priority;
  }

  copy() {
    return new TodoItem(this.value, this.done, this.priority);
  }
}
export function turnToDoItem(json) {
  let prior = 0;
  if (json.priority) {
    switch (json.priority) {
      case "a":
        prior = 0;
        break;
      case "b":
        prior = 1;
        break;
      case "c":
        prior = 2;
        break;
      default:
        prior = json.priority;
    }
  }
  return new TodoItem(json.value, json.done, prior);
}
