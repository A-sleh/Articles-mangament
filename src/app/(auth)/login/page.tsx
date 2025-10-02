import { Metadata } from "next";

import LoginForm from "../_components/LoginForm"

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function Login() {
  return <LoginForm />
}
