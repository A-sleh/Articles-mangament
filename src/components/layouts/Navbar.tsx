"use client";

import { IoMdMenu } from "react-icons/io";

import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import ToggleButton from "../ui/ToggleButton";
import LanguageToggleButton from "../ui/LanguageToggleButton";

export default function Navbar() {
  const user = useAuth((state) => state.user);
  const { isDarkMode, lang, toggleTheme, toggleSidebarView } = useNavSetting(
    (state) => state
  );

  return (
    <nav className="p-2 bg-secondary dark:bg-primary-dark w-full dark:shadow-md dark:shadow-white/20  flex justify-between items-center z-10 sticky top-0">
      <IoMdMenu
        size={30}
        className="cursor-pointer text-white"
        onClick={() => toggleSidebarView()}
      />
      <div className="flex gap-2 items-center justify-between ">
        <ToggleButton onChangeFn={() => toggleTheme()} value={isDarkMode} />
        <LanguageToggleButton />
        {user?.image && (
          <img
            src={user?.image}
            alt="user-avatar"
            className="w-10 h-10 bg-black rounded-full"
          />
        )}
      </div>
    </nav>
  );
}
