export default class List {
  static copy(list) {
    function anon() {
      list = [...list];

      this.removeItem = (item) => {
        const index = list.indexOf(item);
        list.splice(index, 1);
        return list;
      };

      this.replace = (oldItem) => {
        return new With(list, oldItem);
      };
    }
    return new anon();
  }
}

class With {
  constructor(list, old_obj) {
    this.list = list;
    this.old_obj = old_obj;
  }

  with(new_obj) {
    const index = this.list.indexOf(this.old_obj);
    return [
      ...this.list.slice(0, index),
      new_obj,
      ...this.list.slice(index + 1),
    ];
  }
}
