import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { findByPlaceholderText } from "@testing-library/react";

function App() {
  // starts with an empty array as default and loops over as new items are added.
  const [todoList, setTodoList] = useState([]);

  const createInput = useRef(null);

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

  return (
    <div className="App">
      <header>
        <div className="nav-container">
          <h1>
            <img className="logo" src="img/clever.png" alt="logo" />
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
          <TodoList done={false} list={todoList} />
        </div>
        <div>
          <h1>Done</h1>
          <TodoList done={true} list={todoList} />
        </div>
      </div>
    </div>
  );
}

class TodoItem {
  constructor(value, done) {
    this.value = value;
    this.done = done;
  }
}

function Todo({ value }) {
  return (
    <li>
      <input type="checkbox" />
      <input type="text" value={value} /> <button>remove</button>
    </li>
  );
}

function TodoList({ list, done }) {
  return (
    <ul class="entries">
      {list
        .filter((item) => item.done === done)
        .map((item, i) => {
          return <Todo value={item.value} key={i} />;
        })}
    </ul>
  );
}

export default App;
