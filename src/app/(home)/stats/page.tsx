import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ArticlesStatsPerCate from "./_components/ArticlesStatsPerCate";
import ViewsStatsPerDay from "./_components/ViewsStatsPerDay";
import Header from "@/components/layouts/Header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("stats");

  return {
    title: t("title"),
    description:
      "Total information about your articles and number of views for each day",
  };
}

export default async function Stats() {
  const t = await getTranslations("stats");
  return (
    <div className="p-4">
      <Header title={t("title")} />
      <section className="flex flex-col md:flex-row gap-2 transition-all mt-2">
        <ArticlesStatsPerCate />
        <ViewsStatsPerDay />
      </section>
    </div>
  );
}
