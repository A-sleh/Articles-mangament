"use client";

import { useTranslations } from "next-intl";

import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import SettingLayout from "@/components/ui/SettingLayout";
import ToggleButton from "@/components/ui/ToggleButton";

import { VscColorMode } from "react-icons/vsc";
import { IoLanguageOutline } from "react-icons/io5";
import LanguageToggleButton from "@/components/ui/LanguageToggleButton";

export default function SystemSettings() {
  const t = useTranslations("settings.systemSettings");
  const { toggleTheme, isDarkMode } = useNavSetting((state) => state);

  return (
    <div className="space-y-2">
      <SettingLayout icon={<IoLanguageOutline size={20} />}  title={t("language")}>
        <LanguageToggleButton className="bg-primary dark:bg-primary-dark text-white" />
      </SettingLayout>

      <SettingLayout icon={<VscColorMode size={20} />} title={t("theme")}>
        <ToggleButton onChangeFn={toggleTheme} value={isDarkMode} />
      </SettingLayout>
    </div>
  );
}
