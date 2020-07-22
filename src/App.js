import React, { useState, useRef } from "react";
import "./App.css";

// data structure to handle our todo-item's data
class TodoItem {
  constructor(value, done, priority) {
    this.value = value;
    this.done = done;
    this.priority = priority;
  }
}

function App() {
  // starts with an empty array as default and loops over as new items are added.
  const [todoList, setTodoList] = useState([
    new TodoItem("test", false),
    // new TodoItem("test", false, "xyz"),
  ]);

  const createInput = useRef(null);

  //{current:element} = useRef(null)

  // method to add a create item
  const create = () => {
    // refactor below later
    const input = createInput.current;
    // if (input.value.trim() && priority.value != null) {
    if (input.value.trim()) {
      // const new_item = new TodoItem(xyz.value, input.value, false);
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

  const save = (todoItem, new_text) => {
    const new_list = [...todoList];
    const index = new_list.indexOf(todoItem);
    const new_todo = new TodoItem(new_text, todoItem.done);
    setTodoList([
      ...new_list.slice(0, index),
      new_todo,
      ...new_list.slice(index + 1),
    ]);
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
              <label for="not">not</label>
              <input
                type="radio"
                name="priority"
                id="meh"
                value="meh"
                onChange={handleChange}
                required
              />
              <label for="meh">meh</label>
              <input
                type="radio"
                name="priority"
                id="nb"
                value="nb"
                onChange={handleChange}
                required
              />
              <label for="nb">nb!</label>
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
          />
        </div>
      </div>
    </div>
  );
}

function TodoList({ list, done, remove, changeState, save }) {
  return (
    <ul className="entries">
      {list
        .filter((item) => item.done === done)
        .map((item, i) => {
          return (
            <Todo
              todoItem={item}
              remove={remove}
              changeState={changeState}
              save={save}
              key={i}
            />
          );
        })}
    </ul>
  );
}

function Todo({ todoItem, remove, changeState, save }) {
  // takes care of input: document.querySelector("input")
  const input = useRef(null);
  return (
    <li>
      <input
        checked={todoItem.done}
        onChange={() => changeState(todoItem)}
        type="checkbox"
      />
      <input
        ref={input}
        value={todoItem.value}
        onChange={() => save(todoItem, input.current.value)}
        type="text"
      />
      <button onClick={() => remove(todoItem)}>remove</button>
    </li>
  );
}

export default App;
