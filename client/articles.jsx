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
      {articles.map((article) => (
        <ArticlePreviewCard key={article.title} article={article} />
      ))}
    </div>
  );
}

const articles = [
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
