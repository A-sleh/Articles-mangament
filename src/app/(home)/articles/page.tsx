import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Header from "@/components/layouts/Header";
import ArticlesList from "./_components/ArticlesList";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles");

  return {
    title: t("title"),
    description: "Manage your articles",
  };
}

export default async function Articles() {
  const t = await getTranslations("articles");
  return (
    <section className="p-4">
      <Header title={t("title")} />
      <ArticlesList />
    </section>
  );
}
