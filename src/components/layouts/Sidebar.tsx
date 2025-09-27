"use client";

import NavLink from "../ui/NavLink";

import { MdClose, MdOutlineArticle } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

import { useRouter } from "next/navigation";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { successToast } from "../custom/toast";
import { useTranslations } from "next-intl";

export default function Sidebar() {
  const router = useRouter();
  const t = useTranslations("sidebar");

  const logout = useAuth((state) => state.logout);
  const { openSidebar, toggleSidebarView } = useNavSetting();

  const sideBarStyle = openSidebar
    ? "fixed p-4 w-full md:w-fit md:relative"
    : "w-0 md:p-2 md:w-fit";

  async function handleLogoutClicked() {
    try {
      await logout();
      successToast(t("logout-success-not"));
      router.replace("/login");
    } catch (err) {
      throw new Error(t("logout-error-not"));
    }
  }

  return (
    <aside
      className={`flex flex-col justify-between h-screen dark:bg-primary-dark bg-primary shadow-xl transition-all text-center ${sideBarStyle} overflow-hidden md:overflow-visible z-30 md:relative`}
    >
      <div className="flex flex-col gap-3 h-full">
        <div className="flex justify-between items-center">
          <div className="text-white flex items-center gap-2 p-2 border border-white rounded-md w-fit md:mx-auto">
            <GrArticle size={30} />
            <h2 className={`${openSidebar ? "md:block" : "hidden"} text-lg whitespace-nowrap`}>
              {t("title")}
            </h2>
          </div>
          <MdClose
            size={25}
            onClick={toggleSidebarView}
            className="text-white cursor-pointer md:hidden"
          />
        </div>

        <NavLink
          href="/articles"
          title={t("articles-linke")}
          activeClassName="bg-white dark:text-black"
          Icon={<MdOutlineArticle size={25}  />}
        >
          {t("articles-linke")}
        </NavLink>

        <NavLink
          href="/stats"
          title={t("stats-linke")}
          activeClassName="bg-white"
          Icon={<FaRegChartBar size={25}   />}
        >
          {t("stats-linke")}
        </NavLink>

        <NavLink
          href="/workingHours"
          title={t("working-hours-linke")}
          activeClassName="bg-white"
          Icon={<CiCalendarDate size={25}  />}
        >
          {t("working-hours-linke")}
        </NavLink>

        <NavLink
          href="/settings"
          title={t("setting-linke")}
          activeClassName="bg-white"
          Icon={<IoSettingsSharp size={25} />}
        >
          {t("setting-linke")}
        </NavLink>
      </div>

      <button
        onClick={handleLogoutClicked}
        title={t("logout-btn-linke")}
        className="px-4 py-1 bg-white font-normal cursor-pointer rounded-xs w-fit mx-auto flex items-center gap-2 hover:bg-white/50 transition-all text-nowrap"
      >
        <AiOutlineLogout size={25} />
        <p className={`${openSidebar ? "md:block" : "hidden"}`}>{t("logout-btn")}</p>
      </button>
    </aside>
  );
}
