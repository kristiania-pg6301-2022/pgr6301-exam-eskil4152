import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export function Articles() {
  return (
    <div>
      <h1>Articles</h1>
      {ARTICLES.map((article) => (
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

  function handleSubmit(event) {
    event.preventDefault();
    ARTICLES.push(newArticle);
    navigate("../articles");
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

const ARTICLES = [
  {
    title: "Man writes js",
    category: "Technology",
    text: "He is doing ok",
  },
  {
    title: "F1 2022",
    category: "Sports",
    text: "Still going",
  },
];
