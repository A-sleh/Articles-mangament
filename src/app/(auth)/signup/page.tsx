import { Metadata } from "next";

import SignupForm from "../_components/SignupForm";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup page to create new account",
};

export default function Signup() {
  return <SignupForm />;
}
