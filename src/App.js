import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./App.css";
import "react-tabs/style/react-tabs.css";

import TodoList from "./component/TodoList";
import {
  isInputNotEmpty,
  emptyInput,
  confirmDelete,
} from "./functional/helper";

import copy from "./functional/copy";
import TodoItem, { turnToDoItem } from "./Data";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  // const [inputText,]
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

  const create = () => {
    const input = createInput.current;
    if (isInputNotEmpty(input)) {
      addTodo(input.value, priority);
      emptyInput(input);
      setPriority("a");
    } else {
      alert("Do add something!");
    }
  };

  const addTodo = (value, priority) => {
    const new_item = new TodoItem(value, false, priority);
    setTodoList([...todoList, new_item]);
  };

  const remove = (todo) => {
    if (confirmDelete()) {
      const new_list = copy(todoList).removeItem(todo);
      setTodoList(new_list);
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

  class HideAndShowDivOnClick extends React.Component {
    state = {
      showDiv: false,
    };

    onButtonPress(event) {
      const id = event.target.innerHTML;
      // console.log(id);
      const quickItem = createInput.current;
      quickItem.value = id;
    }

    render() {
      const { showDiv } = this.state;
      return (
        <div>
          <button onClick={() => this.setState({ showDiv: !showDiv })}>
            {showDiv ? "hide" : "show"}
          </button>
          {showDiv && (
            <Tabs>
              <TabList>
                <Tab>Food</Tab>
                <Tab>Personal</Tab>
                <Tab>Exercise</Tab>
                <Tab>Work</Tab>
                <Tab>General</Tab>
              </TabList>
              <TabPanel>
                <h3>Food</h3>
                <ul className="dropdownContent">
                  <li>
                    <button onClick={this.onButtonPress}>🐄 milk</button>
                  </li>
                  <li>
                    <button onClick={this.onButtonPress}>🥑 avocado</button>
                  </li>
                  <li>
                    <button onClick={this.onButtonPress}>🍞 bread</button>
                  </li>
                  <li>
                    <button onClick={this.onButtonPress}>🥓 bacon</button>
                  </li>
                  <li>
                    <button onClick={this.onButtonPress}>🥦 broccoli</button>
                  </li>
                  <li>
                    <button onClick={this.onButtonPress}>🍳 eggs</button>
                  </li>
                  <li>
                    <button onClick={this.onButtonPress}>🥗 salad</button>
                  </li>
                  <li>
                    <button onClick={this.onButtonPress}>🍝 spaghetti</button>
                  </li>
                </ul>
              </TabPanel>
              <TabPanel>
                <h3>Personal</h3>
              </TabPanel>
              <TabPanel>
                <h3>Exercise</h3>
              </TabPanel>
              <TabPanel>
                <h3>Work</h3>
              </TabPanel>
              <TabPanel>
                <h3>General</h3>
              </TabPanel>
            </Tabs>
          )}
        </div>
      );
    }
  }

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
          <HideAndShowDivOnClick />
          <div className="priority">
            <h4>Importance?</h4>
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
            <input
              className="textbox"
              ref={createInput}
              name="creationInput"
              placeholder="What to do next?"
              required
            />
          </div>
          <button onClick={create}>Add New</button>
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
