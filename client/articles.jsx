import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "./http";
import { useLoading } from "./useLoading";

function ArticleCard({ article }) {
  const { title, category, text } = article;
  return (
    <div>
      <h4>{title}</h4>
      <h5>{category}</h5>
      <p>{text}</p>
    </div>
  );
}

function ArticlePreviewCard({ article }) {
  const { title, category } = article;
  return (
    <div>
      <h4>
        {title}, {category}
      </h4>
    </div>
  );
}

const Context = React.createContext({
  async listArticles() {
    return await fetchJSON("/api/articles");
  },
});

export function Articles() {
  const { listArticles } = useContext(Context);

  const { loading, error, data } = useLoading(async () => await listArticles());

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Articles in the database</h1>
      {data.map((article) => (
        <ArticlePreviewCard key={article.title} article={article} />
      ))}
    </div>
  );
}

export function NewArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [newArticle, setNewArticle] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setNewArticle({ title, category, text });
  }, [title, category, text]);

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("/api/articles", {
      method: "post",
      body: JSON.stringify({ title, category, text }),
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:{" "}
        <input
          value={title}
          name={"title"}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        Category:{" "}
        <input
          value={category}
          name={""}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        Text:{" "}
        <div>
          <textarea
            value={text}
            name={"text"}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}

const ARTICLES = [];
