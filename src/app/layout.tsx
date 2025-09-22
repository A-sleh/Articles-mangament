import "./globals.css";

import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

import SettingProvider from "@/components/providers/SettingProvider";

const myCustomFont = localFont({
  src: "../font/static/ReadexPro-VariableFont_HEXP,wght.ttf", // Path to your font file
  variable: "--font-NumitioSanas",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${myCustomFont.variable} ${myCustomFont.className}`}
      >
        <SettingProvider>{children}</SettingProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
