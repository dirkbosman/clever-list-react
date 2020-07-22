import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import { shallow, mount } from "enzyme";

describe("App", () => {
  const app = mount(<App />);
  test("exist", () => {
    expect(app.find(".create > input").exists()).toBe(true);
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
    expect(app.find("Todo").exists()).toBe(true);

    app
      .find(".create > input")
      .simulate("change", { target: { value: "new todo" } });

    app.find(".create > button").simulate("click");
    expect(app.find("Todo").exists()).toBe(true);
  });
});
