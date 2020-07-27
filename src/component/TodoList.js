import React from "react";

// (a,b) => return a.priority.keyCode()-b.priority.keyCode();

export default function TodoList({ list, done, remove, changeState, save }) {
  return (
    <ul className="entries">
      {list
        .filter((item) => item.done === done)
        .sort((a, b) => b.priority.charCodeAt(0) - a.priority.charCodeAt(0))

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
  const cut = todoItem.done ? "cut" : "not-cut";
 // takes care of input: document.querySelector("input")
  return (
    <li id={todoItem.priority}>
      <input
        checked={todoItem.done}
        onChange={() => changeState(todoItem)}
        type="checkbox"
      />
      <input className={"todo-text-input " + cut}
        value={todoItem.value}
        onChange={(e) => save(todoItem, e.target.value)}
        type="text"
      />
      <button className="todo-button" onClick={() => remove(todoItem)}>remove</button>
    </li>
  );
}
