import React from "react";
import App from "./App";

import { mount } from "enzyme";

describe("App", () => {
  const app = mount(<App />);
  test("exist", () => {
    expect(app.find(".textbox input").exists()).toBe(true);
    expect(app.find(".textbox button").exists()).toBe(true);
    expect(app.find("TodoLists").exists()).toBe(true);
  });

  test("create new todo", () => {
    expect(app.find("Todo").exists()).toBe(false);

    app.find(".textbox input").instance().value = "new Todo";

    app.find(".textbox button").simulate("click");

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
    let notDoneList = app.find("TodoLists TodoListComponent").at(0);
    let doneList = app.find("TodoLists TodoListComponent").at(1);

    expect(notDoneList.find("Todo").exists()).toBe(true);
    expect(doneList.find("Todo").exists()).toBe(false);

    Todo.find("input").at(0).simulate("change");

    notDoneList = app.find("TodoLists TodoListComponent").at(0);
    doneList = app.find("TodoLists TodoListComponent").at(1);
    expect(notDoneList.find("Todo").exists()).toBe(false);
    expect(doneList.find("Todo").exists()).toBe(true);
  });

  test("change text of todo and keep it on done change", () => {
    app.find("Todo").find("input").at(0).simulate("change");

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
