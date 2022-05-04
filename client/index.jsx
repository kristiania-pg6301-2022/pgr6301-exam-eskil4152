import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Articles } from "./articles";
import { Login } from "./login";
import { useLoader } from "./useLoader";
import { fetchJSON } from "./http";

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/articles"} element={<Articles />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function FrontPage() {
  const { loading, error, data, reload } = useLoader(
    async () => await fetchJSON("/api/login")
  );
  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div style={{ border: "1px solid red", background: "Pink" }}>
        An error occurred: {error.toString()}
      </div>
    );
  }

  return <div>{user ? <Articles /> : <LoginRegister />}</div>;
}

function LoginRegister() {
  return (
    <div>
      <h1>Welcome to my webpage</h1>
      <div>
        <Link to={"/login"}>Log in</Link>
      </div>
      <div>
        <Link to={"/register"}>Sign up</Link>
      </div>
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
