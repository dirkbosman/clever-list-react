import TodoItem from "../Data";

export default function copy(item) {
  if (item instanceof TodoItem) {
    return new Change(item.copy());
  } else {
    return new List(item);
  }
}

function List(item) {
  const list = [...item];

  this.removeItem = getRemoveItem(list);

  this.replace = getReplace(list);

  this.get = () => {
    return list;
  };
}

function getRemoveItem(list) {
  return (item) => {
    const index = list.indexOf(item);
    list.splice(index, 1);
    return list;
  };
}

function getReplace(list) {
  return (old_item) => {
    return new With(list, old_item);
  };
}

class With {
  constructor(list, first_obj) {
    this.list = list;
    this.first_obj = first_obj;
  }

  with(second_obj) {
    const index = this.list.indexOf(this.first_obj);
    return [
      ...this.list.slice(0, index),
      second_obj,
      ...this.list.slice(index + 1),
    ];
  }
}

class Change {
  constructor(obj) {
    this.obj = obj;
  }

  change(property) {
    return new To(this.obj, property);
  }
}

class To {
  constructor(obj, property) {
    this.obj = obj;
    this.property = property;
  }

  to(value) {
    this.obj[this.property] = value;
    return this.obj;
  }
}
