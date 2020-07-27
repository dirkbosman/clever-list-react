import React from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default (h1, p, onYes) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui" style={{ backgroundColor: "green" }}>
          <h1>{h1}</h1>
          <p>{p}</p>
          <button onClick={onClose}>No</button>
          <button
            onClick={() => {
              onYes();
              onClose();
            }}
          >
            Yes!
          </button>
        </div>
      );
    },
  });
};
