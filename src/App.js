// http://localhost:3000/

import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

// data handling
class TodoItem {
  constructor(value, done) {
    this.value = value;
    this.done = done;
  }
}

function App() {
  // starts with an empty array as default and loops over as new items are added.
  const [todoList, setTodoList] = useState([]);

  const createInput = useRef(null);

  //{current:element} = useRef(null)

  // method to add a create item
  const create = () => {
    // refactor below later
    const input = createInput.current;
    if (input.value.trim()) {
      const new_item = new TodoItem(input.value, false);
      input.value = "";
      setTodoList([...todoList, new_item]);
    } else {
      alert("Do add something!");
    }
  };

  // make a brand new list without the specific item, and over-write old one when time is ready.
  const copyListAndRemove = (list, item) => {
    const new_list = [...list];
    const index = new_list.indexOf(item);
    new_list.splice(index, 1);
    return new_list;
  };

  // total removal from the whole list
  const remove = (todoItem) => {
    if (window.confirm("Sure you wanna delete item?")) {
      const helper_list = copyListAndRemove(todoList, todoItem);
      setTodoList(helper_list);
    }
  };

  // we only have 1 list
  // change state of specific todo-item via clicking the checkbox
  const changeState = (todoItem) => {
    const new_todo = {};
    Object.assign(new_todo, todoItem);
    new_todo.done = !todoItem.done;
    const helper_list = copyListAndRemove(todoList, todoItem);
    setTodoList([...helper_list, new_todo]);
  };

  /*  const save = (todoItem, new_text) => {
    const helper_list = copyListAndRemove(todoList, todoItem);
    const new_todo = new TodoItem(new_text, todoItem.done);
    setTodoList([...helper_list, new_todo]);
  };*/

  return (
    <div className="App">
      <header>
        <div className="nav-container">
          <h1>
            <img
              className="header-logo"
              // src="/img/clever_logo.png"
              src={window.location.origin + "/img/clever_logo.png"}
              alt="logo"
            />

            {/* <img src={require("../img/clever_logo.png")} alt="logo" /> */}
            {/* <img src="http://localhost:3000/img/clever_logo.png" alt="logo" /> */}
            {/* <img src="/src/img/myImage.png" alt="logo" /> */}

            <a href="/">Clever</a>
          </h1>
        </div>
      </header>
      <div className="main">
        <div className="create">
          <h1>New To-do</h1>
          <input ref={createInput} placeholder="What to do next?" required />
          <button onClick={create}>Create</button>
        </div>
        <div>
          <h1>To-Do's</h1>
          <TodoList
            done={false}
            list={todoList}
            remove={remove}
            changeState={changeState}
          />
        </div>
        <div>
          <h1>Done</h1>
          <TodoList
            done={true}
            list={todoList}
            remove={remove}
            changeState={changeState}
          />
        </div>
      </div>
    </div>
  );
}

function TodoList({ list, done, remove, changeState }) {
  return (
    <ul class="entries">
      {list
        .filter((item) => item.done === done)
        .map((item, i) => {
          return (
            <Todo
              todoItem={item}
              remove={remove}
              changeState={changeState}
              key={i}
            />
          );
        })}
    </ul>
  );
}

function Todo({ todoItem, remove, changeState }) {
  // saved into an item after created.
  const v = todoItem.value + "";
  const [value, setValue] = useState(v);

  // takes care of input: document.querySelector("input")
  const input = useRef(null);

  const change = () => {
    const text = input.current.value;
    setValue(text);
    todoItem.value = text;
  };

  return (
    <li>
      <input
        checked={todoItem.done}
        onClick={() => changeState(todoItem)}
        type="checkbox"
      />
      <input ref={input} value={value} onChange={() => change()} type="text" />
      <button onClick={() => remove(todoItem)}>remove</button>
    </li>
  );
}

export default App;
