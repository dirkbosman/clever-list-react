import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import ReactTestUtils from "react-dom/test-utils"; // ES6

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

  test("create new todo", () => {
    expect(app.find("Todo").exists()).toBe(false);

    app.find(".textbox > input").instance().value = "new Todo";

    app.find(".create > button").simulate("click");

    const Todo = app.find("Todo");
    expect(Todo.exists()).toBe(true);

    const textInput = Todo.findWhere((n) => {
      return n.prop("type") === "text";
    });
    expect(textInput.exists()).toBe(true);
    expect(textInput.instance().value).toBe("new Todo");
  });

  test("change done of todo", () => {
    const Todo = app.find("Todo");
    let notDoneList = app.findWhere((n) => {
      return n.prop("done") === false;
    });
    let doneList = app.findWhere((n) => {
      return n.prop("done") === true;
    });

    expect(notDoneList.find("Todo").exists()).toBe(true);
    expect(doneList.find("Todo").exists()).toBe(false);

    Todo.find("input").at(0).simulate("change");

    notDoneList = app.findWhere((n) => {
      return n.prop("done") === false;
    });

    doneList = app.findWhere((n) => {
      return n.prop("done") === true;
    });

    expect(notDoneList.find("Todo").exists()).toBe(false);
    expect(doneList.find("Todo").exists()).toBe(true);
  });

  test("change text of todo and keep it on done change", () => {
    const Todo = app.find("Todo");

    Todo.find("input").at(1).instance().value = "new_text";
    Todo.find("input").at(1).simulate("change"); // very  nice´!

    Todo.find("input").at(0).simulate("change");

    expect(app.find("Todo").find("input").at(1).instance().value).toBe(
      "new_text"
    );
  });
  /*confirm dialog blocks this test
  test("remove todo", () => {
    expect(app.find("Todo").exists()).toBe(true);

    const Todo = app.find("Todo");

    Todo.find("button").simulate("click");

    expect(app.find("Todo").exists()).toBe(false);
  });*/
});
