import { MemoryRouter } from "react-router-dom";
import {
  ArticleCard,
  ArticlePreviewCard,
  ArticlesPreview,
  EditArticle,
  FullArticles,
  NewArticle,
} from "../pages/articles";
import ReactDOM from "react-dom";
import React from "react";
import { act } from "react-dom/test-utils";

describe("articles tests", () => {
  it("should return full article", async () => {
    const element = document.createElement("app");

    await act(async () => {
      ReactDOM.render(<FullArticles />, element);
    });

    expect(element).toMatchSnapshot();
  });

  it("should return preview article", async function () {
    const element = document.createElement("app");

    await act(async () => {
      ReactDOM.render(<ArticlesPreview />, element);
    });

    expect(element).toMatchSnapshot();
  });

  it("should return article card", async function () {
    const article = [{ title: "title" }];
    const element = document.createElement("div");

    await act(async () => {
      ReactDOM.render(<ArticleCard article={() => article} />, element);
    });

    expect(element).toMatchSnapshot();
  });

  it("should return article preview card", function () {
    const article = [{ title: "title" }];

    const element = document.createElement("div");
    ReactDOM.render(<ArticlePreviewCard article={article} />, element);

    expect(element).toMatchSnapshot();
  });

  it("should return edit article form", function () {
    const element = document.createElement("app");
    ReactDOM.render(
      <MemoryRouter>
        <EditArticle />
      </MemoryRouter>,
      element
    );

    expect(element).toMatchSnapshot();
  });

  it("should return new article form", function () {
    const element = document.createElement("app");
    ReactDOM.render(
      <MemoryRouter>
        <NewArticle />
      </MemoryRouter>,
      element
    );

    expect(element).toMatchSnapshot();
  });
});
