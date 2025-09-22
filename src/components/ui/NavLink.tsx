"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

type navLinkType = {
  href: string;
  activeClassName: string;
  children: React.ReactNode;
  Icon?: React.ReactElement;
  title: string;
};

export default function NavLink({
  href,
  activeClassName,
  children,
  title,
  Icon,
  ...props
}: navLinkType) {
  const isOpen = useNavSetting((state) => state.openSidebar);
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      title={title}
      href={href}
      className={`px-3 py-2  rounded-md text-grady font-normal flex items-center gap-2 hover:bg-white/50 transition-all ${
        isActive ? "bg-white dark:text-black" : "dark:text-white"
      }`}
      {...props}
    >
      {Icon}
      <p className={` ${isOpen ? "md:block" : "hidden"} `}>{children}</p>
    </Link>
  );
}
