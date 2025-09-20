"use client";

import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuth((state) => state.user);

  if (!user) {
    router.replace("/login");

    return null;
  } else {
    return children;
  }
}
