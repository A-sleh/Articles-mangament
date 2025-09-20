"use client";

import { useArticles } from "@/stores/Article-store/Articles-store";
import Article from "./Article";

import SortableList from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move'



export default function ArticlesList() {

  const { articles, updateArticles } = useArticles((state) => state);

  const onSortEnd = (oldIndex: number, newIndex: number) => {

    const newStortedArticles = arrayMoveImmutable(articles, oldIndex, newIndex);
    updateArticles(newStortedArticles)
  }

  return (
    <section className="p-1 w-full space-y-2">
      <h1 className="text-xl font-bold">Articles</h1>
      <SortableList onSortEnd={onSortEnd} className="list space-y-2" draggedItemClassName="dragged" >
          {articles?.map((article) => (
            <Article article={article} key={article.id} />
          ))}
      </SortableList>
    </section>
  );
}
