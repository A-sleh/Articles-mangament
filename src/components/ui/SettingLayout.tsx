"use client";

import { FC, ReactNode } from "react";

interface SettingLayoutProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const SettingLayout: FC<SettingLayoutProps> = ({ title, icon, children }) => (
  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 w-full">
    <div className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
      {icon}
      <h3 className="font-medium text-lg">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

export default SettingLayout;
