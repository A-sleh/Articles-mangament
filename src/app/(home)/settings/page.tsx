import { useTranslations } from "next-intl";

import Header from "@/components/layouts/Header";
import SubHeader from "@/components/layouts/SubHeader";

import SystemSettings from "./_components/SystemSettings";
import UserAvatar from "./_components/UserAvatar";
import UserInfo from "./_components/UserInfo";

export default function Settings() {
  const t = useTranslations("settings");
  return (
    <section className="p-4">
      <Header title={t("setting-title")} />
      <div className="space-y-3">
        <SubHeader title={t("user-information-title")} withUnderLine={true} />
        <div className="flex flex-col just md:flex-row gap-3  ">
          <UserAvatar />
          <UserInfo />
        </div>
        <SubHeader title={t("system-title")}  withUnderLine={true} />
        <SystemSettings />
      </div>
    </section>
  );
}
