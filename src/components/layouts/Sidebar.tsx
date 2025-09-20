"use client";

import NavLink from "../ui/NavLink";

import { MdClose } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

import { useRouter } from "next/navigation";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { successToast } from "../custom/toast";
import { AnimateChildLeftEffect } from "@/lib/Animation/AnimateParentLeftEffect";

export default function Sidebar() {
  const router = useRouter();

  const logout = useAuth((state) => state.logout);
  const { openSidebar, toggleSidebarViwe } = useNavSetting((state) => state);

  const sideBarStyle = openSidebar
    ? "fixed p-4 w-full md:w-fit md:relative"
    : "w-0 md:p-2 md:w-fit";

  async function handleLogoutClicked() {
    try {
      await logout();
      successToast("Logout successfuly");
      router.replace("/login");
    } catch (err) {
      throw new Error("Error occurer while logout ...");
    }
  }

  return (
    <aside
      className={`flex flex-col justify-between h-screen bg-amber-200 shadow-xl transition-all text-center  ${sideBarStyle} overflow-hidden md:overflow-visible`}
    >
      <div className="flex flex-col gap-3 h-full">
        <div className="flex justify-between items-center">
          <div className="text-white flex itmes-center gap-2 p-2 border border-white rounded-md w-fit md:mx-auto md:w-fit">
            <GrArticle size={30} />
            <h2
              className={`text-lg text-nowrap ${
                openSidebar ? " md:block" : "hidden"
              }`}
            >
              Articles store
            </h2>
          </div>
          <MdClose
            size={25}
            onClick={() => toggleSidebarViwe(false)}
            className="text-white cursor-pointer md:hidden"
          />
        </div>

        <NavLink
          href="/articles"
          title="Articles"
          className="px-3 py-2 rounded-md text-grady font-normal flex items-center gap-2 hover:bg-white/50 transition-all"
          activeClassName="bg-white"
          Icon={<MdOutlineArticle size={25} />}
        >
          Articles
        </NavLink>

        <NavLink
          href="/stats"
          title="Stats"
          className="px-3 py-2 rounded-md text-grady font-normal flex items-center gap-2 hover:bg-white/50 transition-all"
          activeClassName="bg-white "
          Icon={<FaRegChartBar size={25} />}
        >
          Stats
        </NavLink>

        <NavLink
          title="Working hours"
          href="/workingHours"
          className="px-3 py-2 rounded-md text-grady font-normal flex items-center gap-2 hover:bg-white/50 transition-all "
          activeClassName="bg-white"
          Icon={<CiCalendarDate size={25} />}
        >
          WorkingHours
        </NavLink>

        <NavLink
          title="Setting"
          href="/settings"
          className="px-3 py-2 rounded-md text-grady font-normal flex items-center gap-2 hover:bg-white/50 transition-all"
          activeClassName="bg-white "
          Icon={<IoSettingsSharp size={25} />}
        >
          Settings
        </NavLink>
      </div>
      <button
        onClick={handleLogoutClicked}
        className="px-4 py-1 bg-white font-normal cursor-pointer rounded-xs w-fit mx-auto flex items-center gap-2 hover:bg-white/50 transition-all"
      >
        <AiOutlineLogout size={25} />
        <p className={`${openSidebar ? "md:block" : "hidden"} `}>Logout</p>
      </button>
    </aside>
  );
}
