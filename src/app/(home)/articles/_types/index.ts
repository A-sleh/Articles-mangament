
import { type Article } from "src/src/stores/Article-store/Articles-store";

export type IArticle = Pick<
  Article,
  "category" | "published" | "scheduled" | "title" | "id"
>;
