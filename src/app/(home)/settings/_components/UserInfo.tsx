"use client";


import { FormEvent, useRef, useState } from "react";
import { ICreadential, IDBUser, useAuth } from "@/stores/Auth-store/Auth-srore";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store"
import { Input } from "@/components/ui/Input";

import Button from "@/components/ui/Button";
import { IoMdSettings, IoMdCloseCircleOutline } from "react-icons/io";
import { errorToast, successToast } from "@/components/custom/toast";
import { useTranslations } from "next-intl";

export default function UserInfo() {
  const t = useTranslations("settings.userInfo");
  const { user, updateUserCreadential } = useAuth((state) => state);
  const lang = useNavSetting(state => state.lang)

  const initialValues: ICreadential = {
    gemail: user?.gemail || "",
    password: user?.password || "",
  };

  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState<IDBUser>(initialValues);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserCreadential(form);
      successToast(t("update-success"));
      setUpdate(false);
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 w-full dark:text-white relative"
    >
      {update ? (
        <IoMdCloseCircleOutline
          size={20}
          className={`text-red-600 dark:text-white cursor-pointer absolute ${lang == 'ar' ? 'left-1' :"right-1"} -top-2`}
          onClick={() => {
            setUpdate(false);
            setForm(initialValues);
          }}
          title={t("cancel")}
        />
      ) : (
        <IoMdSettings
          size={20}
          className={`text-primary dark:text-white cursor-pointer absolute ${lang == 'ar' ? 'left-1' :"right-1"} -top-2`}
          onClick={() => {
            setUpdate(true);
            inputRef.current?.focus();
          }}
          title={t("edit")}
        />
      )}

      <Input
        readOnly={!update}
        value={form.gemail}
        onChange={(e) => setForm({ ...form, gemail: e.target.value })}
        label={t("email-label")}
        type="email"
        className="dark:bg-transparent"
        ref={inputRef}
      />

      <Input
        readOnly={!update}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        label={t("password-label")}
        type="password"
        className="dark:bg-transparent"
      />

      {update && <Button title={t("apply")} />}
    </form>
  );
}
