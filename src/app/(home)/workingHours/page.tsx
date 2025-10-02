import { cookies } from "next/headers";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import Header from "@/components/layouts/Header";
import WorkingHoursLayout from "./_components/WorkingHoursLayout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("working-hours");

  return {
    title: t("title"),
    description: "Manage your working hours",
  };
}

export default async function WorkingHours() {
  const t = await getTranslations("working-hours");

  return (
    <section className="p-4">
      <Header title={t("title")} />
      <WorkingHoursLayout />
    </section>
  );
}
