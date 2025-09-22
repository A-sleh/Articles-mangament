import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IArticle {
  id: number;
  title: string;
  category: string;
  tages: string[];
  cover: string;
  published: boolean;
  scheduled: Date | string;
  richText: any;
  localUrl: string; 
};

type articlesState = {
  articles: IArticle[];
};

type articlesActions = {
  deleteArticle: (articleId: number) => void;
  createArticle: (body: IArticle) => void;
  updateArticle: (articleId: number, body: IArticle) => void;
  updateArticles: (articles: IArticle[]) => void;
  getArticleBy: (articleId: number) => IArticle | null;
};

type artcilesStore = articlesActions & articlesState;


function handleDeleteArticle(articles: IArticle[], articleId: number) {
  return articles.filter((article) => article.id != articleId);
}

function handleUpdateArticle(
  articles: IArticle[],
  articleId: number,
  newArticle: IArticle
) {
  return articles.map((article) => {
    if (article.id === articleId) return newArticle;
    return article;
  });
}

function handleGetArticle(id: number, articles: IArticle[]) : IArticle | null {
  
  const article = articles.find((article) => article.id == id);
  return article ?? null;
}

function handleCreateArticle(articles: IArticle[], newArticle: IArticle) {
  // Create a uniqe id
  const newArticleId = (articles[articles.length - 1]?.id || 0) + 1;
  return [...articles, { ...newArticle, id: newArticleId }];
}

export const useArticles = create<artcilesStore>()(
  persist(
    (set, get) => ({
      articles: [],
      updateArticles: (articles: IArticle[]) =>
        set({ ...get(), articles: articles }),
      getArticleBy: (articleId: number): IArticle | null =>
        handleGetArticle(articleId, get().articles),
      deleteArticle: (articleId: number) =>
        set({
          ...get(),
          articles: handleDeleteArticle(get().articles, articleId),
        }),
      createArticle: (body: IArticle) =>
        set({
          ...get(),
          articles: handleCreateArticle(get().articles, body),
        }),
      updateArticle: (articleId: number, body: IArticle) =>
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
