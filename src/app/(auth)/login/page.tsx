"use client";

import { useRouter } from "next/navigation";

import { ChangeEvent, FormEvent, useState } from "react";

import Input from "../../../components/ui/Input";

import { useAuth, User } from "../../../stores/Auth-store/Auth-srore"
import { errorToast, successToast } from "../../../components/custom/toast";
import { convertImageToBase64 } from "../../../utils/helper";

const storeduser = {
  gemail: "abdo@gmail.com",
  password: "12345678",
};

const intialValue: User = {
  gemail: "",
  password: "",
  image: null,
};

export default function Authintication() {
  const router = useRouter();

  // Will use it  soon
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // This to show the url inside the file input
  const [user, setUser] = useState<User>(intialValue);

  const login = useAuth((state) => state.login);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      storeduser.gemail != user.gemail ||
      storeduser.password != user.password
    ) {
      errorToast("User name or password was wrond please, try again");
      return;
    }
    try {
      await login(user);
      router.replace("/articles");
      successToast("Login successfully");

    }catch(err) {
      throw new Error("Some thing went wrong while login")
    }
  };

  const handleFileSelceted = async (
    selectedFiles: ChangeEvent<HTMLInputElement>    
  ) => {
    // If there is no file selected
    if (!selectedFiles?.target?.files) return;
    setImageUrl(selectedFiles?.target.value);
    try {
      setIsLoading(true);
      const imageBase64 = await convertImageToBase64(
        selectedFiles?.target?.files[0] || ""
      );
      setUser({
        ...user,
        image: `data:image/png;base64,${imageBase64}`,
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 rounded-md bg-white shadow-md">
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
      <Input
        label="Image"
        placeHolder="Enter avatar iamge"
        type="file"
        value={imageUrl || ""}
        onChange={handleFileSelceted}
      />
      <button className=" bg-yellow-200 rounded-md text-white px-2 py-1 cursor-pointer w-full transition-all hover:text-black hover:bg-white hover:outline-amber-200 hover:outline-1">
        Login
      </button>
    </form>
  );
}
