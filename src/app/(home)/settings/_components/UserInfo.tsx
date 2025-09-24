"use client";

import { FormEvent, useRef, useState } from "react";

import { IDBUser, useAuth } from "@/stores/Auth-store/Auth-srore";
import {Input} from "@/components/ui/Input";

import { IoMdSettings } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "@/components/ui/Button";
import { errorToast, successToast } from "@/components/custom/toast";

export default function UserInfo() {
  const { user, updateDbUser } = useAuth((state) => state);
  const intialValues: IDBUser = {
    gemail: user?.gemail,
    password: user?.password,
  };

  const [update, setUpdate] = useState<boolean>(false);
  const [form, setForm] = useState<IDBUser>(intialValues);
  const intiInputRef = useRef<null | HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateDbUser(form);
      successToast("User information was updated");
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
          className="text-red-600 dark:text-white cursor-pointer  absolute right-1 -top-2"
          onClick={() => {
            setUpdate(false);
            setForm(intialValues);
          }}
        />
      ) : (
        <IoMdSettings
          size={20}
          className="text-primary dark:text-white cursor-pointer  absolute right-1 -top-2"
          onClick={() => {
            setUpdate(true);
            intiInputRef.current?.focus();
          }}
        />
      )}
      <Input
        readOnly={!update}
        value={form?.gemail}
        onChange={(e) => setForm({ ...form, gemail: e.target.value })}
        label="Gemail"
        type="gemail"
        className="dark:bg-transparent"
        ref={intiInputRef}
      />
      <Input
        readOnly={!update}
        value={form?.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        label="Password"
        type="text"
        className="dark:bg-transparent"
      />
      {update && <Button title="Apply" />}
    </form>
  );
}
