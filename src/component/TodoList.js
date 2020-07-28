import React from "react";

// (a,b) => return a.priority.keyCode()-b.priority.keyCode();

export default function TodoLists({ todoList, todoFunctions }) {
  const notDoneItems = todoList.filter((e) => e.done === false);
  const doneItems = todoList.filter((e) => e.done === true);
  return (
    <div>
      <div className="notDoneList">
        <TodoListComponent list={notDoneItems} todoFunctions={todoFunctions} />
      </div>
      <div className="doneList">
        <TodoListComponent list={doneItems} todoFunctions={todoFunctions} />
      </div>
    </div>
  );
}
const TodoListComponent = ({ list, todoFunctions }) => {
  if (list.length === 0) return "";

  const headline = (!list[0].done && "To-Do's") || (list[0].done && "Done");
  const todoItems = list
    .sort((a, b) => b.priority - a.priority)
    .map((item, i) => <Todo todoItem={item} {...todoFunctions} key={i} />);

  return (
    <div>
      <h2> {headline}</h2>
      <ul className="entries">{todoItems}</ul>
    </div>
  );
};

function Todo({ todoItem, remove, changeState, save }) {
  const cut = todoItem.done ? "cut" : "not-cut";
  const onChange = (e) => save(todoItem, e.target.value);

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
        onChange={!todoItem.done && onChange}
        type="text"
      />
      <button className="todo-button" onClick={() => remove(todoItem)}>
        Remove
      </button>
    </li>
  );
}
