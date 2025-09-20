"use client";


import { IoMdMenu } from "react-icons/io";

import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store"; 

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
    <nav className="p-2 bg-amber-100 w-full flex justify-between items-center z-10 ">
      <IoMdMenu
        size={30}
        className="cursor-pointer"
        onClick={() => toggleSidebarViwe(!isDarkMod)}
      />
      <div className="flex gap-2 items-center justify-between ">
        <div
          className={`h-8 rounded-3xl w-15 items-center bg-amber-300 p-1 flex ${
            isDarkMod ? "justify-end" : "justify-start"
          } transition-all cursor-pointer`}
          onClick={() => toggleTheme(!isDarkMod)}
        >
          <span
            className={`rounded-full bg-yellow-200  h-[25px] w-[25px] `}
          ></span>
        </div>
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
