"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { errorToast, successToast } from "@/components/custom/toast";
import { Input } from "@/components/ui/Input";
import FileInput from "@/components/ui/FileInput";

import { getFileUrl } from "@/utils/helper";
import { User, useAuth } from "@/stores/Auth-store/Auth-srore";

const intialValue: User = {
  gemail: "",
  password: "",
  image: null,
};

export default function Authintication() {
  const router = useRouter();

  // Will use it  soon
  const [imageUrl, setImageUrl] = useState(""); // This to show the url inside the file input
  const [user, setUser] = useState<User>(intialValue);

  const { login, dbUser } = useAuth((state) => state);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dbUser.gemail != user.gemail || dbUser.password != user.password) {
      errorToast("User name or password was wrond please, try again");
      return;
    }

    try {
      await login(user);
      router.replace("/articles");
      successToast("Login successfully");
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  const handleFileSelceted = async (
    selectedFiles: ChangeEvent<HTMLInputElement>
  ) => {
    // If there is no file selected
    if (!selectedFiles?.target?.files) return;

    try {
      const imageUrl = await getFileUrl(selectedFiles?.target?.files[0]);
      setImageUrl(selectedFiles?.target?.value); // To display it on file input

      setUser({
        ...user,
        image: imageUrl,
      });
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 rounded-md bg-white shadow-md min-w-[30vw]"
    >
      <Input
        label="Email"
        placeHolder="Enter your email"
        required={true}
        type="email"
        value={user.gemail}
        onChange={(e) => setUser({ ...user, gemail: e.target.value })}
      />
      <Input
        label="Password"
        placeHolder="Enter your password"
        required={true}
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FileInput
        label="Image"
        placeHolder="Enter avatar iamge"
        onChange={handleFileSelceted}
        value={imageUrl}
      />

      <button className="bg-primary dark:bg-secondary-dark rounded-md text-white px-2 py-1 cursor-pointer w-full transition-all hover:text-black hover:bg-white hover:outline-primary  hover:outline-1">
        Login
      </button>
    </form>
  );
}
