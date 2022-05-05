import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Articles, NewArticle } from "./articles";
import { Login, Register } from "./login";
import { useLoader } from "./useLoader";
import { fetchJSON } from "./http";

function WelcomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <a href={"/articles"}>Articles</a>
    </div>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/articles"} element={<Articles />} />
        <Route path={"/articles/new"} element={<NewArticle />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/welcome"} element={<WelcomePage />} />
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

  return <div>{user ? <WelcomePage /> : <LoginRegister />}</div>;
}

function LoginRegister() {
  return (
    <div>
      <h1>Welcome to my webpage</h1>
      <div>
        <a href={"/login"}>Log in</a>
      </div>
      <div>
        <a href={"/register"}>Register</a>
      </div>
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));

function Logout() {
  const navigate = useNavigate;

  async function submitLogout(e) {
    e.preventDefault();
    const logout = fetch("/api/logout", {
      method: "delete",
    });
  }

  useEffect(async () => {
    await submitLogout();
    navigate("/");
  }, []);
}

const logout = <button onClick={Logout}>Log out</button>;

ReactDOM.render(logout, document.getElementById("top-bar"));
