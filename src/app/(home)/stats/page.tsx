import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ArticlesStatistcs from "./_components/ArticlesStatistcs";
import Header from '@/components/layouts/Header'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("stats");

  return {
    title: t("title"),
    description: "Total information about your articles and number of views for each day",
  };
}

export default async function Stats() {
  const t = await getTranslations("stats");
  return (
    <div className="p-4">
      <Header title={t('title')} />
      <ArticlesStatistcs />
    </div>
  );
}
