"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { VscColorMode } from "react-icons/vsc";
import { IoLanguageOutline } from "react-icons/io5";

import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import SettingLayout from "@/components/ui/SettingLayout";
import ToggleButton from "@/components/ui/ToggleButton";
import LanguageToggleButton from "@/components/ui/LanguageToggleButton";

const SystemSettings: FC = () => {
  const t = useTranslations("settings.systemSettings");
  const { toggleTheme, isDarkMode } = useNavSetting((state) => state);

  return (
    <div className="flex flex-col gap-4 ">
      <SettingLayout icon={<IoLanguageOutline size={22} />} title={t("language")}>
        <LanguageToggleButton className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm hover:shadow-md transition" />
      </SettingLayout>

      <SettingLayout icon={<VscColorMode size={22} />} title={t("theme")}>
        <ToggleButton
          onChangeFn={toggleTheme}
          value={isDarkMode}
          className="transition-transform duration-300"
        />
      </SettingLayout>
    </div>
  );
};

export default SystemSettings;
