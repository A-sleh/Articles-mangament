"use client";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useArticles } from "@/stores/Article-store/Articles-store";
import { AiOutlineDelete } from "react-icons/ai";
import { FaDownload, FaPencilAlt } from "react-icons/fa";

import { useTranslations } from "next-intl";

import { successToast } from "@/components/custom/toast";
import DownLoadArticlePdf from "@/components/pdf/Article/DownLoadArticlePdf";
import ArticleForm from "../_components/ArticleForm";
import NotFoundMessage from "@/components/ui/NotFoundMessage";

const ICON_SIZE = 20;

export default function Article({ params }: { params: { id: number } }) {
  const router = useRouter();
  const t = useTranslations("articles.article");

  const { getArticleBy, deleteArticle } = useArticles((state) => state);
  const article = getArticleBy(params.id);

  if (!article)
    return <NotFoundMessage message={t("not-found-message")} />;

  const { cover, title, published, scheduled, category, tags, richText } = article;

  async function handleDelete(id: number) {
    try {
      await deleteArticle(id);
      successToast(t("article-deleted"));
      router.replace("/articles");
    } catch (err) {
      throw new Error(t("delete-error"));
    }
  }

  return (
    <section className="p-4">
      <header className="flex justify-between p-2 bg-primary dark:bg-primary-dark rounded-md mb-2 text-white">
        <span>{new Date(scheduled || '').toDateString()}</span>
        <Link href="/articles" aria-label={t("back-to-articles")}>
          <IoChevronBackCircleOutline size={25} />
        </Link>
      </header>
      <div className="flex gap-2 dark:text-white">
        <Image
          src={cover || ""}
          width={400}
          height={400}
          alt={t("cover-image-alt")}
          className="w-[12rem] md:w-[22rem] rounded-md"
        />
        <div className="w-full">
          <div className="flex justify-between w-full">
            <h1 className="text-xl font-bold uppercase flex items-center gap-2">
              {title}
              <span
                className={`${
                  published ? "bg-green-400" : "bg-red-400"
                } text-white p-1 rounded-md font-normal text-sm`}
              >
                {published ? t("published") : t("not-published")}
              </span>
            </h1>
            <div className="actions flex gap-2">
              <AiOutlineDelete
                size={ICON_SIZE}
                className="text-red-400 cursor-pointer"
                onClick={() => handleDelete(params.id)}
                title={t("delete-article")}
              />
              <ArticleForm method="PUT" initialForm={article}>
                <FaPencilAlt
                  size={ICON_SIZE}
                  className="text-blue-400 cursor-pointer"
                  title={t("edit-article")}
                />
              </ArticleForm>
              <DownLoadArticlePdf article={article}>
                <FaDownload
                  size={ICON_SIZE}
                  className="cursor-pointer"
                  title={t("download-pdf")}
                />
              </DownLoadArticlePdf>
            </div>
          </div>
          <div className="mb-3">
            <span className="text-white bg-primary rounded-md px-2 py-1">
              {category}
            </span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: richText }} />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap my-2">
        {tags?.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 rounded-md bg-primary text-white">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
