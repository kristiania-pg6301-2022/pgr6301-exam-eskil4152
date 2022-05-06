import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "../http";
import { useLoading } from "../useLoading";

export function ArticleCard({ article }) {
  const { title, category, text, author } = article;
  return (
    <div>
      <h3>
        {title}, {category}
      </h3>
      <h5>Author: {author}</h5>
      <p>{text}</p>
    </div>
  );
}

export function ArticlePreviewCard({ article }) {
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

export function FullArticles() {
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
      <h1>Articles</h1>
      <a href={"/articles/new"}>
        <button>New article</button>
      </a>
      <a href={"/articles/edit"}>
        <button>Edit article</button>
      </a>
      {data.map((article) => (
        <div id={"cards"}>
          <ArticleCard key={article.title} article={article} />
        </div>
      ))}
    </div>
  );
}

export function EditArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newText, setNewText] = useState("");
  const [error, setError] = useState("");

  const [editedArticle, setEditedArticle] = useState({
    title,
    newTitle,
    newCategory,
    newText,
  });

  useEffect(() => {
    setEditedArticle({ title, newTitle, newCategory, newText });
  }, [title, newTitle, newCategory, newText]);

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("/api/articles", {
      method: "put",
      body: JSON.stringify({ title, newTitle, newCategory, newText }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      navigate("..");
    } else {
      setError("You did not make this article");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name of article to edit:{" "}
        <input
          type={"text"}
          name={"title"}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        New name:{" "}
        <input
          type={"text"}
          name={"newTitle"}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        New category:{" "}
        <input
          type={"text"}
          name={"newCategory"}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </div>
      <div>
        New text:
        <div>
          <textarea
            name={"newText"}
            onChange={(e) => setNewText(e.target.value)}
          />
        </div>
      </div>
      <div>{error}</div>
      <button>Submit</button>
    </form>
  );
}

export function ArticlesPreview() {
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
      <h1>Articles</h1>
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

  const [error, setError] = useState("");
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
    if (res.ok) {
      navigate("..");
    } else {
      setError("Error: Article " + title + " already exists");
    }
  }

  const CATEGORIES = [
    "Sports",
    "Breaking",
    "Drama",
    "Technology",
    "Economy",
    "World",
  ];

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
        <select
          value={category}
          name={"category"}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={CATEGORIES[0].toString()} key={"sports"}>
            {CATEGORIES[0]}
          </option>
          <option value={CATEGORIES[1].toString()} key={"breaking"}>
            {CATEGORIES[1]}
          </option>
          <option value={CATEGORIES[2].toString()} key={"drama"}>
            {CATEGORIES[2]}
          </option>
          <option value={CATEGORIES[3].toString()} key={"tech"}>
            {CATEGORIES[3]}
          </option>
          <option value={CATEGORIES[4].toString()} key={"economy"}>
            {CATEGORIES[4]}
          </option>
          <option value={CATEGORIES[5].toString()} key={"world"}>
            {CATEGORIES[5]}
          </option>
        </select>
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
      <div>{error}</div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
