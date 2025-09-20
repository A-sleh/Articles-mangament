"use client";

import { closestCorners, DndContext, useSensor,PointerSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useArticles } from "src/stores/Article-store/Articles-store";
import Article from "./Article";

export default function ArticlesList() {
  const { articles, updateArticles } = useArticles((state) => state);

  const getArticlePos = (id: number) => {
    let pos = -1;
    articles.forEach((article, index) => {
      if (article.id == id) {
        pos = index;
      }
    });
    return pos;
  };

  function handleEndOfElementDrag(event) {
    const { active, over } = event;

    // If the article still in the same postion
    if (active.id === over.id) return;

    const originPos = getArticlePos(active.id);
    const nextPos = getArticlePos(over.id);
    const newStortedArticles = arrayMove(articles, originPos, nextPos);

    updateArticles(newStortedArticles);
  }

  return (
    <section className="p-1 w-full space-y-2">
      <h1 className="text-xl font-bold">Articles</h1>
      <DndContext
        onDragEnd={handleEndOfElementDrag} 
        collisionDetection={closestCorners}
        >
        <div className="space-y-2">
          <SortableContext
            items={articles}
            strategy={verticalListSortingStrategy}
          >
            {articles?.map((article) => (
              <Article article={article} key={article.id} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </section>
  );
}
