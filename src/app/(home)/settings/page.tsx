import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Header from "@/components/layouts/Header";
import SubHeader from "@/components/layouts/SubHeader";

import SystemSettings from "./_components/SystemSettings";
import UserAvatar from "./_components/UserAvatar";
import UserInfo from "./_components/UserInfo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("settings");

  return {
    title: t("setting-title"),
    description: "Personal setting page",
  };
}

export default async function Settings() {
  const t = await getTranslations("settings");

  return (
    <section className="p-4">
      <Header title={t("setting-title")} />
      <div className="space-y-3">
        <SubHeader title={t("user-information-title")} withUnderLine={true} />
        <div className="flex flex-col just md:flex-row gap-3  ">
          <UserAvatar />
          <UserInfo />
        </div>
        <SubHeader title={t("system-title")} withUnderLine={true} />
        <SystemSettings />
      </div>
    </section>
  );
}
