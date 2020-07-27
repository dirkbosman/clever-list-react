import React from "react";

export default function SelectPriority({ names, priority, handleChange }) {
  return (
    <div className="priority">
      <h4>Priority?</h4>
      <form>
        {names.map((name, index) => (
          <PriorityButton
            name={name}
            ownPriority={index}
            priority={priority}
            handleChange={handleChange}
          />
        ))}
      </form>
    </div>
  );
}

function PriorityButton({ ownPriority, priority, handleChange, name }) {
  return (
    <span key={ownPriority}>
      <input
        type="radio"
        name="priority"
        id={"id" + ownPriority}
        value={ownPriority}
        onChange={handleChange}
        checked={ownPriority + "" === priority ? true : false}
        required
      />
      <label htmlFor={"id" + ownPriority}>{name}</label>
    </span>
  );
}
