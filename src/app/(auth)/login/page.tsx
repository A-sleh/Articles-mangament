"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { errorToast, successToast } from "@/components/custom/toast";
import { Input } from "@/components/ui/Input";

import ChangeLink from "../_components/ChangeLink";
import { ICredential, useAuth } from "@/stores/Auth-store/Auth-srore";

const intialValue: ICredential = {
  gemail: "",
  password: "",
};

export default function Login() {
  const t = useTranslations("login");
  const router = useRouter();

  const login = useAuth((state) => state.login);
  const [user, setUser] = useState<ICredential>(intialValue);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(user);
      router.replace("/articles");
      successToast(t("login-success"));
    } catch (err) {
      console.log(err)
      errorToast(t("error-invalid-credentials"));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 rounded-md bg-white shadow-md min-w-[30vw]"
    >
      <Input
        label={t("email-label")}
        placeHolder={t("email-placeholder")}
        required={true}
        type="email"
        value={user.gemail}
        onChange={(e) => setUser({ ...user, gemail: e.target.value })}
      />
      <Input
        label={t("password-label")}
        placeHolder={t("password-placeholder")}
        required={true}
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button className="bg-primary dark:bg-secondary-dark rounded-md text-white px-2 py-1 cursor-pointer w-full transition-all hover:text-black hover:bg-white hover:outline-primary  hover:outline-1">
        {t("login-button")}
      </button>
      <ChangeLink
        link="/signup"
        btn={t("signup-btn")}
        desctiption={t("dont-have-account")}
      />
    </form>
  );
}
