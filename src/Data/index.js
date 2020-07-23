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
