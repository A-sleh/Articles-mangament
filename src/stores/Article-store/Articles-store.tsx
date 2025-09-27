import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ========== Types ==========

export interface IArticle {
  id: number;
  title: string;
  category: string;
  tags: string[]; 
  cover: string;
  published: boolean;
  scheduled: Date | string;
  richText: any;
  localUrl: string;
}

type ArticlesState = {
  articles: IArticle[];
};

type ArticlesActions = {
  deleteArticle: (articleId: number) => void;
  createArticle: (body: IArticle) => void;
  updateArticle: (articleId: number, body: IArticle) => void;
  updateArticles: (articles: IArticle[]) => void;
  getArticleBy: (articleId: number) => IArticle | null;
};

type ArticlesStore = ArticlesState & ArticlesActions;

// ========== Helper Functions ==========

const handleDeleteArticle = (articles: IArticle[], id: number): IArticle[] =>
  articles.filter((article) => article.id != id);

const handleUpdateArticle = (
  articles: IArticle[],
  id: number,
  updated: IArticle
): IArticle[] =>
  articles.map((article) => (article.id == id ? updated : article));

const handleGetArticle = (
  id: number,
  articles: IArticle[]
): IArticle | null => articles.find((article) => article.id == id) ?? null;

const handleCreateArticle = (
  articles: IArticle[],
  newArticle: IArticle
): IArticle[] => {
  const newId = (articles[articles.length - 1]?.id || 0) + 1;
  return [...articles, { ...newArticle, id: newId }];
};

// ========== Zustand Store ==========

export const useArticles = create<ArticlesStore>()(
  persist(
    (set, get) => ({
      articles: [],

      updateArticles: (articles) => set({ articles }),

      getArticleBy: (id) => handleGetArticle(id, get().articles),

      deleteArticle: (id) =>
        set((state) => ({
          articles: handleDeleteArticle(state.articles, id),
        })),

      createArticle: (article) =>
        set((state) => ({
          articles: handleCreateArticle(state.articles, article),
        })),

      updateArticle: (id, updatedArticle) =>
        set((state) => ({
          articles: handleUpdateArticle(state.articles, id, updatedArticle),
        })),
    }),
    {
      name: "articles",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
