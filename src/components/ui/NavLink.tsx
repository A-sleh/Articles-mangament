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
  className?: string;
};

export default function NavLink({
  href,
  activeClassName,
  children,
  className,
  title,
  Icon,
  ...props
}: navLinkType) {

  const isOpen = useNavSetting(state => state.openSidebar)
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      title={title}
      href={href}
      className={`${className} ${isActive ? activeClassName : ""} `}
      {...props}
    >
      {Icon}
      <p className={` ${isOpen ? 'md:block' : 'hidden'} `}>{children}</p>
    </Link>
  );
}
