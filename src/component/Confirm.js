import React from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import styles from "./confirm.module.css";

export default (h1, p, onYes) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <h1>{h1}</h1>
          <p>{p}</p>
          <form className={styles.form}>
            <button
              className={styles.button + " " + styles.safe}
              onClick={onClose}
            >
              No
            </button>
            <button
              className={styles.button + " " + styles.danger}
              onClick={() => {
                onYes();
                onClose();
              }}
            >
              Yes
            </button>
          </form>
        </div>
      );
    },
  });
};
