import { getTranslations } from "next-intl/server";

import Header from "@/components/layouts/Header";
import WorkingHoursLayout from "./_components/WorkingHoursLayout";

export default async function WorkingHours() {
  const t = await getTranslations("articles");

  return (
    <section className="p-4">
      <Header title={t("title")} />
      <WorkingHoursLayout />
    </section>
  );
}
