import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Article = {
  id: number;
  title: string;
  category: string;
  tages?: string[];
  cover?: string;
  published: boolean;
  scheduled: Date | string;
  richText?: any;
};

type articlesState = {
  articles: Article[];
};

type articlesActions = {
  deleteArticle: (articleId: number) => void;
  createArticle: (body: Article) => void;
  updateArticle: (articleId: number, body: Article) => void;
  updateArticles: (articles: Article[]) => void;
  getArticleBy: (articleId: number) => Article | null;
};

type artcilesStore = articlesActions & articlesState;

export const intialState: articlesState = {
  articles: [
    {
      id: 1,
      title: "Title test",
      category: "News",
      published: false,
      scheduled: new Date(),
    },
    {
      id: 2,
      title: "Abdo asleh",
      category: "Post",
      published: true,
      scheduled: new Date(),
    },
    {
      id: 3,
      title: "Abdo asleh",
      category: "Post",
      published: false,
      scheduled: new Date(),
    },
  ],
};

function handleDeleteArticle(articles: Article[], articleId: number) {
  return articles.filter((article) => article.id !== articleId);
}

function handleUpdateArticle(
  articles: Article[],
  articleId: number,
  newArticle: Article
) {
  return articles.map((article) => {
    if (article.id === articleId) return newArticle;
    return article;
  });
}

function handleGetArticle(id: number, articles: Article[]) {
  const article = articles.find((article) => article.id === id);

  return article ?? null;
}

function handleCreateArticle(articles: Article[], newArticle: Article) {
  // Create a uniqe id
  const newArticleId = articles[articles.length - 1].id + 1;
  return [...articles, { ...newArticle, id: newArticleId }];
}

export const useArticles = create<artcilesStore>()(
  persist(
    (set, get) => ({
      ...intialState,
      updateArticles: (articles: Article[]) =>
        set({ ...get(), articles: articles }),
      getArticleBy: (articleId: number) =>
        handleGetArticle(articleId, get().articles),
      deleteArticle: (articleId: number) =>
        set({
          ...get(),
          articles: handleDeleteArticle(get().articles, articleId),
        }),
      createArticle: (body: Article) =>
        set({
          ...get(),
          articles: handleCreateArticle(get().articles, body),
        }),
      updateArticle: (articleId: number, body: Article) =>
        set({
          ...get(),
          articles: handleUpdateArticle(get().articles, articleId, body),
        }),
    }),
    {
      name: "articles",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
