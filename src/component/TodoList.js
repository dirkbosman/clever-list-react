import React from "react";

// (a,b) => return a.priority.keyCode()-b.priority.keyCode();

export default ({ list, done, todoFunctions }) => (
  <div>
    <h2> {(!done && "To-Do's") || (done && "Done")}</h2>
    <TodoList done={done} list={list} todoFunctions={todoFunctions} />
  </div>
);

export function TodoList({ list, done, todoFunctions }) {
  return (
    <ul className="entries">
      {list
        .filter((item) => item.done === done)
        .sort((a, b) => b.priority - a.priority)

        .map((item, i) => {
          return <Todo todoItem={item} {...todoFunctions} key={i} />;
        })}
    </ul>
  );
}

function Todo({ todoItem, remove, changeState, save }) {
  const cut = todoItem.done ? "cut" : "not-cut";
  // takes care of input: document.querySelector("input")
  return (
    <li id={"id" + todoItem.priority}>
      <input
        checked={todoItem.done}
        onChange={() => changeState(todoItem)}
        type="checkbox"
      />
      <input
        className={"todo-text-input " + cut}
        value={todoItem.value}
        onChange={(e) => save(todoItem, e.target.value)}
        type="text"
      />
      <button className="todo-button" onClick={() => remove(todoItem)}>
        Remove
      </button>
    </li>
  );
}
