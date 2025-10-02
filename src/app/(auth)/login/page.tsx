
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LoginForm from "../_components/LoginForm"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("login");

  return {
    title: t("title"),
    description: "Login page",
  };
}

export default function Login() {
  return <LoginForm />
}
