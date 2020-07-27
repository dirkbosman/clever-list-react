import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import HideAndShowDivOnClick from "./component/QuickList";
import TodoList from "./component/TodoList";
import {
  isInputNotEmpty,
  emptyInput,
  confirmDelete,
} from "./functional/helper";

import Confirm from "./component/Confirm";

import copy from "./functional/copy";
import TodoItem, { turnToDoItem } from "./Data";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [priority, setPriority] = useState("a");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todoList"));
    if (storedTasks) {
      const todoitemlist = storedTasks.map((e) => turnToDoItem(e));
      setTodoList(todoitemlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const createInput = useRef(null);

  const handleChange = (e) => {
    setPriority(e.target.value);
  };

  const create = (e) => {
    const input = createInput.current;
    if (isInputNotEmpty(input)) {
      addTodo(input.value, priority);
      emptyInput(input);
      setPriority("a");
      e.preventDefault();
    } else {
      emptyInput(input);
    }
  };

  const addTodo = (value, priority) => {
    const new_item = new TodoItem(value, false, priority);
    setTodoList([...todoList, new_item]);
  };

  const remove = (todo) => {
    Confirm("Are you sure?", "That you want to delete the todo?", () => {
      doRemove(todo);
    });
  };

  const doRemove = (todo) => {
    const new_list = copy(todoList).removeItem(todo);
    setTodoList(new_list);
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
          <HideAndShowDivOnClick createInput={createInput} />
          <div className="priority">
            <h4>Priority?</h4>
            <form>
              {["a", "b", "c"].map((v, i) => (
                <span>
                  <input
                    type="radio"
                    name="priority"
                    id={v}
                    value={v}
                    onChange={handleChange}
                    key={i}
                    checked={v === priority ? true : false}
                    required
                  />
                  <label htmlFor="not">{v}</label>
                </span>
              ))}
            </form>
          </div>
          <div className="textbox">
            <form>
              <input
                className="textbox"
                ref={createInput}
                name="creationInput"
                placeholder="What to do next?"
                required
              />
              <button className="submit" type="submit" onClick={create}>
                add new{" "}
              </button>
            </form>
          </div>
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
