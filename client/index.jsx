import ReactDOM from "react-dom";
import React from "react";
import { useNavigate, BrowserRouter, Routes, Route, Link } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <div>
        <Link to={"/articles"}>Articles</Link>
      </div>
      <div>
        <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
}

const articles = [
    {
        "title":"Man writes js",
        "category":"Technology",
        "text":"He is doing ok"
    },
    {
        "title":"F1 2022",
        "category":"Sports",
        "text":"Still going"
    }
]

function ArticleCard({article}) {
    const {title, category, text} = article;
    return <div>
        <h4>{title}</h4>
        <h5>{category}</h5>
        <p>{text}</p>
    </div>;
}

function ArticlePreviewCard({article}) {
    const {title, category} = article
    return <div>
        <h4>{title}, {category}</h4>
    </div>
}

function Articles() {
    return <div>
        <h1>Articles</h1>
        {articles.map(article => <ArticlePreviewCard key={article.title} article={article}/>)}
    </div>
}

function Login() {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Logged in?")
        navigate("..")
    }

    return <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <div>Username: <input type={"text"} name={"username"}/></div>
      <div>Password: <input type={"password"} name={"password"}/></div>
      <div><button>Log in</button></div>
  </form>
}

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

ReactDOM.render(<Application />, document.getElementById("app"));
