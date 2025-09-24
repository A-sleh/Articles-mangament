"use client";

import Article from "./Article";
import { arrayMoveImmutable } from "array-move";
import { useArticles } from "@/stores/Article-store/Articles-store";

import SortableList from "react-easy-sort";
import NotFoundMessage from "@/components/ui/NotFoundMessage";
import ArticleForm from "./ArticleForm";

export default function ArticlesList() {
  const { articles, updateArticles } = useArticles((state) => state);

  // For sortable items
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newStortedArticles = arrayMoveImmutable(articles, oldIndex, newIndex);
    updateArticles(newStortedArticles);
  };

  return (
    <section className="p-1 w-full space-y-2">
      <ArticleForm method="POST">
        <button className="px-4 py-1 rounded-md text-white bg-primary dark:bg-primary-dark cursor-pointer">
          New article
        </button>
      </ArticleForm>
      <SortableList
        onSortEnd={onSortEnd}
        className="list space-y-2"
        draggedItemClassName="dragged"
      >
        {articles?.length == 0 ? (
          <NotFoundMessage message="There are no articles yet ..." />
        ) : (
          articles?.map((article) => (
            <Article article={article} key={article.id} />
          ))
        )}
      </SortableList>
    </section>
  );
}
