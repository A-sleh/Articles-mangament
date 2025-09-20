import type { Metadata } from "next";

import Sidebar from "../../components/layouts/Sidebar";
import Navbar from "../../components/layouts/Navbar";

import ProtectedRoute from "../(auth)/_components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Articles",
  description: "Display all websit articles",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="w-full">
          <Navbar />
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
