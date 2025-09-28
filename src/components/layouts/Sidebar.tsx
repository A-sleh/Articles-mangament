"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Settings,
  BarChart,
  LogOut,
  X,
} from "lucide-react";

import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { successToast } from "../custom/toast";
import { Button } from "../ui/button"; // shadcn button
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/articles", labelKey: "articles-linke", Icon: FileText },
  { href: "/stats", labelKey: "stats-linke", Icon: BarChart },
  { href: "/workingHours", labelKey: "working-hours-linke", Icon: Calendar },
  { href: "/settings", labelKey: "setting-linke", Icon: Settings },
];

export default function Sidebar() {
  const router = useRouter();
  const t = useTranslations("sidebar");

  const logout = useAuth((state) => state.logout);
  const { openSidebar, toggleSidebarView } = useNavSetting();

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
    <motion.aside
      animate={{ width: openSidebar ? 240 : 72 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed md:relative z-40 flex flex-col justify-between h-screen",
        "bg-primary dark:bg-primary-dark text-white shadow-xl",
        "overflow-hidden"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <LayoutDashboard size={28} />
          {openSidebar && (
            <h2 className="text-lg font-semibold whitespace-nowrap">
              {t("title")}
            </h2>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarView}
          className="text-white md:hidden"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1 px-2">
        {navItems.map(({ href, labelKey, Icon }) => (
          <Link key={href} href={href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-base rounded-xl transition",
                "hover:bg-white/20 text-white justify-start",
                !openSidebar && "justify-center"
              )}
            >
              <Icon size={22} />
              {openSidebar && (
                <span className="whitespace-nowrap">{t(labelKey)}</span>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <Button
          onClick={handleLogoutClicked}
          variant="secondary"
          className={cn(
            "w-full flex items-center gap-3 rounded-xl justify-start",
            !openSidebar && "justify-center"
          )}
        >
          <LogOut size={22} />
          {openSidebar && <span>{t("logout-btn")}</span>}
        </Button>
      </div>
    </motion.aside>
  );
}
