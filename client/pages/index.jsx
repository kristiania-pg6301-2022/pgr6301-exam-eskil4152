import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  ArticlesPreview,
  EditArticle,
  FullArticles,
  NewArticle,
} from "./articles";
import { Login, Logout, Register } from "./login";
import { useLoader } from "../useLoader";
import { fetchJSON } from "../http";
import React from "react";

export function Application() {
  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Front page</Link>
        <div className="menu-divider" />
        <Link to={"/logout"}>Log out</Link>
      </header>
      <sidebar>
        <div>
          <ArticlesPreview />
        </div>
      </sidebar>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/articles/new"} element={<NewArticle />} />
          <Route path={"/articles/edit"} element={<EditArticle />} />
          <Route path={"/logout"} element={<Logout />} />
          <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export function FrontPage() {
  const navigate = useNavigate();
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

  return <div>{!user ? <LoginRegister /> : <FullArticles />}</div>;
}

export function LoginRegister() {
  return (
    <div>
      <h1>Welcome to my webpage</h1>
      <h3>You have to log in to see full articles</h3>
      <div>
        <a href={"/login"}>Log in</a>
      </div>
      <div>
        <a href={"/register"}>Register</a>
      </div>
    </div>
  );
}
