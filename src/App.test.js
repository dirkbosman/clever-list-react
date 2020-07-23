import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import { shallow, mount } from "enzyme";

describe("App", () => {
  const app = mount(<App />);
  test("exist", () => {
    expect(app.find(".textbox > input").exists()).toBe(true);
    expect(app.find(".create > button").exists()).toBe(true);
    expect(
      app
        .findWhere((n) => {
          return n.prop("done") === false;
        })
        .exists()
    ).toBe(true);
    expect(
      app
        .findWhere((n) => {
          return n.prop("done") === true;
        })
        .exists()
    ).toBe(true);
  });
  /*
  test("create new todo", () => {
    expect(app.find("Todo").exists()).toBe(false);

    app
      .find(".textbox > input")
      .simulate("change", { target: { value: "new todo" } });

    app.find(".create > button").invoke("onClick");
    app.find(".create > button").props("onClick").onClick();
    app.update();

    console.log(app.html());
    const Todo = app.find("Todo");
    expect(Todo.exists()).toBe(true);
    const textInput = Todo.findWhere((n) => {
      return n.prop("type") === "text";
    });
    expect(textInput.exists()).toBe(true);
    console.log(textInput.html());
    console.log(textInput.instance().value);
    expect(textInput.text()).toBe("new todo");
  });

  test("change todo text", () => {
    expect(1).toBe(1);
  });
  */
});
