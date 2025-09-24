"use client"

import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

import SettingLayout from "@/components/ui/SettingLayout";
import ToggleButton from "@/components/ui/ToggleButton";

import { VscColorMode } from "react-icons/vsc";
import { IoLanguageOutline } from "react-icons/io5";

export default function SystemSettings() {
  const { changeLang, toggleTheme, isDarkMod, lang } = useNavSetting(
    (state) => state
  );

    function handleChangeLang() {
      changeLang(lang == "ar" ? "en" : "ar");
    }
  

  return (
    <div className="space-y-2">
      <SettingLayout icon={<IoLanguageOutline size={20} />} title={"language"}>
        <ToggleButton
          onChangeFn={() => toggleTheme(isDarkMod)}
          value={isDarkMod}
        />
      </SettingLayout>

      <SettingLayout icon={<VscColorMode size={20} />} title={"Theme"}>
        <button
          onClick={() => handleChangeLang()}
          className="p-1 px-2 rounded-xs bg-primary text-white dark:bg-primary-dark font-bold cursor-pointer "
        >
          {lang}
        </button>
      </SettingLayout>
    </div>
  );
}
