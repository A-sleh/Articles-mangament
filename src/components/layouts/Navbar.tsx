"use client";

import { IoMdMenu } from "react-icons/io";

import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import ToggleButton from "../ui/ToggleButton";

export default function Navbar() {
  const user = useAuth((state) => state.user);
  const {
    isDarkMod,
    lang,
    toggleTheme,
    changeLang,
    openSidebar,
    toggleSidebarViwe,
  } = useNavSetting((state) => state);

  function handleChangeLang() {
    changeLang(lang == "ar" ? "en" : "ar");
  }

  return (
    <nav className="p-2 bg-secondary dark:bg-primary-dark w-full dark:shadow-md dark:shadow-white/20  flex justify-between items-center z-10 sticky top-0">
      <IoMdMenu
        size={30}
        className="cursor-pointer text-white"
        onClick={() => toggleSidebarViwe(!isDarkMod)}
      />
      <div className="flex gap-2 items-center justify-between ">
        <ToggleButton
          onChangeFn={() => toggleTheme(!isDarkMod)}
          value={isDarkMod}
        />
        <button
          onClick={() => handleChangeLang()}
          className="p-1 px-2 rounded-xs bg-white font-bold cursor-pointer"
        >
          {lang}
        </button>
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
