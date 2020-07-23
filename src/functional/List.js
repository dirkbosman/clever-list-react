export default class List {
  static copy(list) {
    function anon() {
      list = [...list];

      this.removeItem = (item) => {
        const index = list.indexOf(item);
        list.splice(index, 1);
        return list;
      };

      this.replace = (oldItem, newItem) => {
        const index = list.indexOf(oldItem);
        return [...list.slice(0, index), newItem, ...list.slice(index + 1)];
      };
    }
    return new anon();
  }
}
