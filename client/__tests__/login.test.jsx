import { Login, Logout, Register } from "../pages/login";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("login tests", () => {
  it("should return login page", function () {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
      element
    );

    expect(element).toMatchSnapshot();
  });

  it("should return register page", function () {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
      element
    );

    expect(element).toMatchSnapshot();
  });

  it("should return logout page", function () {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>,
      element
    );

    expect(element).toMatchSnapshot();
  });
});
