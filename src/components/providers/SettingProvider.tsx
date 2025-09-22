"use client"

import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

export default function ConvertLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang, isDarkMod } = useNavSetting((state) => state);
  return (
    <div
      style={{ direction: lang == "ar" ? "rtl" : "ltr" }}
      className={isDarkMod ? "dark" : ""}
    >
      {children}
    </div>
  );
}
