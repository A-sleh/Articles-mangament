"use client";

import { useState } from "react";
import { useArticles } from "@/stores/Article-store/Articles-store";
import { errorToast, successToast } from "@/components/custom/toast";

import { IArticle } from "../_types";

import { RiDraggable } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



export default function Article({ article }: { article: IArticle }) {
  const [cursorStyle, setCursorStyle] = useState(false);
  const { deleteArticle, updateArticle } = useArticles((state) => state);

  const { category, id, published, scheduled, title } = article;
  const { attributes, setNodeRef, transform, transition, listeners } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  async function handleDelete(id: number) {

    try {

      await deleteArticle(id);
      successToast("Article was deleted")

    }catch(err) {
      errorToast("Error occure whilet delete article")
    }
  }

  return (
    <div
      style={style}
      className="flex gap-2 items-center bg-white  rounded-md p-2 border border-amber-200 touch"
    >
      <div className="flex justify-between items-center flex-1">
        <div>
          <h3 className="font-bold ">{title}</h3>
          <span className="px-2 py-1 rounded-md text-sm bg-amber-200 text-white">
            {category}
          </span>
        </div>
        <div>
          {((typeof scheduled) == "Date") && (
            <p className="text-sm">{scheduled?.toDateString()}</p>
          )}
          <span
            className={`${
              published ? "bg-green-400" : "bg-red-400"
            } text-white p-1 rounded-xs text-sm `}
          >
            {published ? "Published" : "Not published"}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <AiOutlineDelete
          size={20}
          className="text-red-400 cursor-pointer"
          onClick={() => handleDelete(id)}
        />
        <FaPencilAlt size={20} className="text-blue-400" />
        <RiDraggable
          size={20}
          className={`text-gray-400  ${
            cursorStyle ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setCursorStyle(true)}
          onMouseUp={() => setCursorStyle(false)}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        />
      </div>
    </div>
  );
}
