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
  return new TodoItem(json.value, json.done, json.priority);
}
