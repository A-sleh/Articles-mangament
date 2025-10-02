
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import SignupForm from "../_components/SignupForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("signup");

  return {
    title: t("title"),
    description: "Signup page to create new account",
  };
}

export default function Signup() {
  return <SignupForm />;
}
