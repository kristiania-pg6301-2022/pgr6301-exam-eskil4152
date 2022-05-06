import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { Application, FrontPage, LoginRegister } from "../pages";
import React from "react";

describe("index tests", () => {
  it("should return front page", function () {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
      element
    );

    expect(element).toMatchSnapshot();
  });

  it("should return application", function () {
    const element = document.createElement("div");
    ReactDOM.render(<Application />, element);

    expect(element).toMatchSnapshot();
  });

  it("should return loginOrRegisterPage", function () {
    const element = document.createElement("div");
    ReactDOM.render(<LoginRegister />, element);

    expect(element).toMatchSnapshot();
  });
});
