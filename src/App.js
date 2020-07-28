import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import TodoListComponent from "./component/TodoList";
import { isInputNotEmpty, emptyInput } from "./functional/helper";

import SelectPriority from "./component/SelectPriority";
import HideAndShowDivOnClick from "./component/QuickList";

import Confirm from "./component/Confirm";

import copy from "./functional/copy";
import TodoItem, { turnToDoItem } from "./Data";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [priority, setPriority] = useState("1");

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
      setPriority("1");
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

  const todoFunctions = {
    remove: remove,
    changeState: changeState,
    save: save,
  };

  const [color, setColor] = useState("default-colors");

  return (
    <div className={"App " + color}>
      <header>
        <div className="nav-container">
          <h1>* Clever *</h1>
        </div>
      </header>
      <div className="main">
        <div className="create" id={"id" + priority}>
          <h2>New To-do</h2>
          <HideAndShowDivOnClick createInput={createInput} />
          <SelectPriority
            names={["low", "normal", "high"]}
            priority={priority}
            handleChange={handleChange}
          />
          <div className="textbox">
            <form>
              <input
                // className="textbox"
                className="todo-text-input"
                ref={createInput}
                name="creationInput"
                placeholder="What to do next?"
                required
              />
              <button className="addNew" type="submit" onClick={create}>
                Add{" "}
              </button>
            </form>
          </div>
        </div>
        <div className="list open">
          <TodoListComponent
            done={false}
            list={todoList}
            todoFunctions={todoFunctions}
          />
        </div>
        <div className="list done">
          <TodoListComponent
            done={true}
            list={todoList}
            todoFunctions={todoFunctions}
          />
        </div>
      </div>
      <div className="footer">
        <button onClick={(e) => setColor(e.target.innerHTML + "-colors")}>
          justin
        </button>
        <button onClick={(e) => setColor(e.target.innerHTML + "-colors")}>
          dirk
        </button>
        <button onClick={(e) => setColor(e.target.innerHTML + "-colors")}>
          radhika
        </button>
        <button onClick={(e) => setColor(e.target.innerHTML)}>
          default-colors
        </button>
      </div>
    </div>
  );
}
