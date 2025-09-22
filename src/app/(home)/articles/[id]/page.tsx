"use client";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { FaDownload } from "react-icons/fa6";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useArticles } from "@/stores/Article-store/Articles-store";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";

import ArticleForm from "../_components/ArticleForm";
import { successToast } from "@/components/custom/toast";
import NotFoundMessage from "@/components/ui/NotFoundMessage";

const ICON_SIZE = 20;

export default function Article({ params }: { params: { id: number } }) {
  const router = useRouter();

  const { getArticleBy, deleteArticle } = useArticles((state) => state);
  const article = getArticleBy(params.id);

  if (!article)
    return <NotFoundMessage message="There is no article with this id" />;

  const { cover, title, published, scheduled, category, tages, richText } =
    article;

  async function handleDelete(id: number) {
    try {
      await deleteArticle(id);
      successToast("Article was deleted");
      router.replace("/articles");
    } catch (err) {
      throw new Error("Some thing went wrong please try again");
    }
  }

  return (
    <section className="p-4">
      <header className="flex justify-between p-2 bg-primary dark:bg-primary-dark rounded-md mb-2 text-white">
        <span className="">{new Date(scheduled).toDateString()}</span>
        <Link href="/articles">
          <IoChevronBackCircleOutline size={25} />
        </Link>
      </header>
      <div className="flex gap-2 dark:text-white">
        <Image
          src={cover || ""}
          width={400}
          height={400}
          alt="cover image"
          className="w-[12rem] md:w-[22rem] rounded-md"
        />
        <div className="w-full">
          <div className="flex justify-between w-full">
            <h1 className="text-xl font-bold uppercase">
              {title}
              <span
                className={`${
                  published ? "bg-green-400" : "bg-red-400"
                } text-white p-1 rounded-md font-normal text-sm `}
              >
                {published ? "Published" : "Not published"}
              </span>
            </h1>
            <div className="actions flex gap-2">
              <AiOutlineDelete
                size={ICON_SIZE}
                className="text-red-400 cursor-pointer"
                onClick={() => handleDelete(params.id)}
              />
              <ArticleForm method="PUT" intialForm={article}>
                <FaPencilAlt
                  size={ICON_SIZE}
                  className="text-blue-400 cursor-pointer"
                />
              </ArticleForm>
              <FaDownload size={ICON_SIZE} />
            </div>
          </div>
          <div className="mb-3">
            <span className="text-white bg-primary rounded-md px-2 py-1">
              {category}
            </span>
            <span>{published}</span>
          </div>
          {/* this will not cause XSS becasue it doesn't have any input field  */}
          <div dangerouslySetInnerHTML={{ __html: richText }}></div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap my-2">
        {tages.map((tage) => (
          <span className="px-2 py-1 rounded-md bg-primary text-white">
            {tage}
          </span>
        ))}
      </div>
    </section>
  );
}
