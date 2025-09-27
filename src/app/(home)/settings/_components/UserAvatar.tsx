"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState, FormEvent } from "react";

import { useAuth } from "@/stores/Auth-store/Auth-srore";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import { errorToast, successToast } from "@/components/custom/toast";
import { getFileUrl } from "@/utils/helper";
import { useTranslations } from "next-intl";

export default function UserAvatar() {
  const t = useTranslations("settings.userAvatar");

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [update, setUpdate] = useState(false);
  const { user, changeImage, updateUserName } = useAuth((state) => state);
  const [userName, setUserName] = useState(user?.userName);
  const nameRef = useRef<null | HTMLInputElement>(null);

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      const file = e.target.files[0];
      const url = await getFileUrl(file);

      if (url) {
        changeImage(url);
        successToast(t("update-image-success"));
      } else {
        throw new Error(t("error-setting-user-image"));
      }
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  const handleChangeName = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    updateUserName(userName || '')
    setUpdate(false)
    successToast(t('success-update-userName'))
  }

  const handleRemoveImage = () => {
    if (!user?.image) return;
    changeImage(null);
    successToast(t("image-removed-success"));
  };

  return (
    <div className="flex flex-col gap-1 items-center dark:text-white relative">
      {update ? (
          
            <IoIosClose
              size={25}
              className="text-red-600 cursor-pointer absolute top-0 right-0"
              onClick={() => {
                setUpdate(false);
                setUserName(user?.userName);
              }}
            />
          
        ) : (
          <FaPenToSquare
            size={15}
            className="text-primary cursor-pointer absolute top-0 right-0"
            onClick={() => {
              setUpdate(true);
              nameRef.current?.focus();
            }}
          />
        )}
      <div className="relative w-32 h-32 rounded-full overflow-hidden group">
        <Image
          src={user?.image || ""}
          width={128}
          height={128}
          alt={t("user-image-label")}
          className="w-full h-full bg-black dark:bg-primary-dark object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bg-white/30 px-2 py-1 rounded-lg top-1/2 left-1/2 flex gap-2 -translate-x-1/2 -translate-y-3 opacity-0 transition-all group-hover:-translate-y-1/2 group-hover:opacity-100">
          <input
            type="file"
            hidden
            ref={imageRef}
            onChange={handleChangeImage}
            accept="image/*"
          />
          <FaFileUpload
            size={20}
            className="text-primary cursor-pointer"
            onClick={() => imageRef.current?.click()}
            title={t("upload-image")}
          />
          <MdOutlineDeleteOutline
            size={20}
            className="text-red-600 cursor-pointer"
            onClick={handleRemoveImage}
            title={t("remove-image")}
          />
        </div>
      </div>
      <form onSubmit={(e) => handleChangeName(e)} className="flex justify-between items-center">
        {update &&
            <button>
              <FaCheck
                size={15}
                className="text-green-600 cursor-pointer"
              />
            </button>
          
        }
        <input
          type="text"
          readOnly={!update}
          ref={nameRef}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`my-2 py-1 text-center outline-none border-none ${!update ? '': "rounded-sm shadow-sm"}`}
        />
      </form>
    </div>
  );
}
