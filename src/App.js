import React, { useState, useRef } from "react";
import "./App.css";

import TodoList from "./component/TodoList";
import List from "./functional/List";
import { isInputNotEmpty, emptyInput } from "./functional/helper";

// data structure to handle our todo-item's data
class TodoItem {
  constructor(value, done, priority) {
    this.value = value;
    this.done = done;
    this.priority = priority;
  }

  static copy(item) {
    return new TodoItem(item.value, item.done, item.priority);
  }

  change(property) {
    return new To(this, property);
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

// generally make a brand new list without the specific item, and over-write old one when time is ready.
export default function App() {
  // starts with an empty array as default and loops over as new items are added.
  const [todoList, setTodoList] = useState([
    new TodoItem("test", false),
    // new TodoItem("test", false, "xyz"),
  ]);

  const createInput = useRef(null);

  //{current:element} = useRef(null)

  // method to add a create item
  const create = () => {
    const input = createInput.current;
    // if (input.value.trim() && priority.value != null) {
    if (isInputNotEmpty(input)) {
      // const new_item = new TodoItem(xyz.value, input.value, false);
      addTodo(input.value);
      emptyInput(input);
    } else {
      alert("Do add something!");
    }
  };

  const addTodo = (value, property) => {
    const new_item = new TodoItem(value, false, property);
    setTodoList([...todoList, new_item]);
  };

  // total removal from the whole list
  const remove = (todoItem) => {
    if (window.confirm("Sure you wanna delete item?")) {
      setTodoList(List.copy(todoList).removeItem(todoItem));
    }
  };

  // we only have 1 list
  // change state of specific todo-item via clicking the checkbox
  const changeState = (todoItem) => {
    const new_todo = TodoItem.copy(todoItem).change("done").to(!todoItem.done);
    const list = List.copy(todoList).removeItem(todoItem);
    setTodoList([...list, new_todo]);
  };

  const save = (todoItem, new_text) => {
    const new_todo = TodoItem.copy(todoItem).change("value").to(new_text);
    const newList = List.copy(todoList).replace(todoItem).with(new_todo);
    setTodoList(newList);
  };

  const [priority, setPriority] = useState("");
  const handleChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <div className="nav-container">
          <h1>
            {/* <img src={require("../img/clever_logo.png")} alt="logo" /> */}
            <a href="/">Clever</a>
          </h1>
        </div>
      </header>
      <div className="main">
        <div className="create" id={priority}>
          <h1>New To-do</h1>
          <div className="priority">
            <h4>How important is this todo?</h4>
            <form>
              <input
                type="radio"
                name="priority"
                id="not"
                value="not"
                onChange={handleChange}
                required
                defaultChecked
              />
              <label htmlFor="not">not</label>
              <input
                type="radio"
                name="priority"
                id="meh"
                value="meh"
                onChange={handleChange}
                required
              />
              <label htmlFor="meh">meh</label>
              <input
                type="radio"
                name="priority"
                id="nb"
                value="nb"
                onChange={handleChange}
                required
              />
              <label htmlFor="nb">nb!</label>
            </form>
          </div>

          <div className="textbox">
            <input ref={createInput} placeholder="What to do next?" required />
          </div>
          <button onClick={create}>Create</button>
        </div>

        <div>
          <h1>To-Do's</h1>
          <TodoList
            done={false}
            list={todoList}
            remove={remove}
            changeState={changeState}
            save={save}
          />
        </div>
        <div>
          <h1>Done</h1>
          <TodoList
            done={true}
            list={todoList}
            remove={remove}
            changeState={changeState}
            save={save}
          />
        </div>
      </div>
    </div>
  );
}
