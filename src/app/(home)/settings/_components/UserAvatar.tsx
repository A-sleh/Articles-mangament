"use client";

import Image from "next/image";
import { ChangeEvent, useRef } from "react";

import { useAuth } from "@/stores/Auth-store/Auth-srore";

import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { errorToast, successToast } from "@/components/custom/toast";
import { getFileUrl } from "@/utils/helper";

export default function UserAvatar() {
  const imageRef = useRef<null | HTMLInputElement>(null);
  const { user, changeImage } = useAuth((state) => state);

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    // Check if there is a selected file
    if (!e.target.files) return;
    try {
      const file = e.target.files[0];
      const url = await getFileUrl(file);

      if (url) {
        changeImage(url);
        successToast("Update image successfuly");
      } else throw new Error("Error while set the user image");
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  function handleRemoveImage() {
    changeImage(null);
    successToast("Image url was removed");
  }

  return (
    <div className="flex flex-col gap-1 items-center dark:text-white">
      <div className="rounded-full overflow-hidden w-32 h-32 relative group">
        <Image
          src={user?.image || ""}
          width={100}
          height={100}
          className="bg-black dark:bg-primary-dark w-full h-full"
          alt="profile-image"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-black/30 opacity-0 transition-all group-hover:opacity-100"></div>
        <div className="flex gap-2 absolute top-[50%] left-[50%] transition-all translate-x-[-50%] translate-y-[-60%] group-hover:translate-y-[-50%] opacity-0 group-hover:opacity-100">
          <input
            type="file"
            onChange={handleChangeImage}
            hidden
            ref={imageRef}
          />
          <FaFileUpload
            size={20}
            className="text-primary cursor-pointer"
            onClick={() => imageRef.current?.click()}
          />
          <MdOutlineDeleteOutline
            size={20}
            className="text-red-600 cursor-pointer"
            onClick={handleRemoveImage}
          />
        </div>
      </div>
      <p className="my-2">user image</p>
    </div>
  );
}
