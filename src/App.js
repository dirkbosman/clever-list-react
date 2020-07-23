import React, { useState, useRef } from "react";
import "./App.css";

import TodoList from "./component/TodoList";
import {
  isInputNotEmpty,
  emptyInput,
  confirmDelete,
} from "./functional/helper";

import copy from "./functional/copy";
import TodoItem from "./Data";

export default function App() {
  const [todoList, setTodoList] = useState([new TodoItem("test", false)]);

  const createInput = useRef(null);

  const create = () => {
    const input = createInput.current;
    if (isInputNotEmpty(input)) {
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

  const remove = (todo) => {
    if (confirmDelete()) {
      setTodoList(copy(todoList).removeItem(todo));
    }
  };

  const changeState = (todo) => {
    const new_todo = copy(todo).change("done").to(!todo.done);
    const list = copy(todoList).removeItem(todo);
    setTodoList([...list, new_todo]);
  };

  const save = (todo, new_text) => {
    const new_todo = copy(todo).change("value").to(new_text);
    const newList = copy(todoList).replace(todo).with(new_todo);
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
              {["not", "meh", "nb"].map((v, i) => (
                <span>
                  <input
                    type="radio"
                    name="priority"
                    id={v}
                    value={v}
                    onChange={handleChange}
                    required
                    key={i}
                  />
                  <label htmlFor="not">{v}</label>
                </span>
              ))}
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
