"use client";

import Link from "next/link";
import { useState } from "react";
import { SortableItem } from "react-easy-sort";

import { IArticle, useArticles } from "@/stores/Article-store/Articles-store";

import { MdOutlineReadMore } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";


import ArticleForm from './ArticleForm'
import { errorToast, successToast } from "@/components/custom/toast";


export default function Article({ article }: { article: IArticle }) {

  const { deleteArticle } = useArticles((state) => state);
  const { id, published, title, scheduled, category } = article;

  // For drag and drop ( cursor style )
  const [cursorStyle, setCursorStyle] = useState(false);

  async function handleDelete(id: number) {
    try {
      await deleteArticle(id);
      successToast("Article was deleted");
    } catch (err) {
      errorToast("Error occure whilet delete article");
    }
  }

  return (
    <SortableItem key={id} >
      <div className="flex gap-2 dark:text-white items-start bg-white dark:bg-primary-dark  rounded-md p-2 border  touch">
        <div className="flex justify-between flex-1">
          <div>
            <h3 className="font-bold ">{title}</h3>
            <span className="px-2 py-1 rounded-md text-sm bg-primary text-white">
              {category}
            </span>
          </div>
          <div>
            <p className="text-sm my-1">{new Date(scheduled).toDateString()}</p>
            <span
              className={`${
                published ? "bg-green-400" : "bg-red-400"
              } text-white p-1 rounded-xs text-sm `}
            >
              {published ? "Published" : "Not published"}
            </span>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          
          <AiOutlineDelete
            size={20}
            className="text-red-400 cursor-pointer"
            onClick={() => handleDelete(id)}
          />
          <ArticleForm method="PUT" intialForm={article}>
            <FaPencilAlt size={20} className="text-blue-400 cursor-pointer" />
          </ArticleForm>

          <Link href={`/articles/${id}`}>
                <MdOutlineReadMore size={20}/>
          </Link>

        </div>
          <RiDraggable
            size={20}
            className={`text-gray-400 self-center  ${
              cursorStyle ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={() => setCursorStyle(true)}
            onMouseUp={() => setCursorStyle(false)}
          />
      </div>
    </SortableItem>
  );
}
