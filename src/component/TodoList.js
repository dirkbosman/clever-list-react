import React, { useState, useRef } from "react";

// (a,b) => return a.priority.keyCode()-b.priority.keyCode();

export default function TodoList({ list, done, remove, changeState, save }) {
  return (
    <ul className="entries">
      {list
        .sort((a, b) => a.priority.charCodeAt(0) - b.priority.charCodeAt(0))
        .reverse()
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
  return (
    <li id={todoItem.priority}>
      <input
        checked={todoItem.done}
        onChange={() => changeState(todoItem)}
        type="checkbox"
      />
      <input
        value={todoItem.value}
        onChange={(e) => save(todoItem, e.target.value)}
        type="text"
      />
      <button onClick={() => remove(todoItem)}>remove</button>
    </li>
  );
}
