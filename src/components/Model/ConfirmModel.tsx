"use client";

import React, { FC } from "react";
import { useTranslations } from "next-intl";


import { AiOutlineInfoCircle } from "react-icons/ai";

import Modal from "./Model";
import AnimateScale from "@/lib/Animation/AnimateScale";
import AnimateButton from "@/lib/Animation/AnimateButton";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

interface IConfirmeModal {
  handleApply: () => void;
  ModalKey: string;
  message: string;
  children: React.ReactElement;
}

const ConfirmModal: FC<IConfirmeModal> = ({
  handleApply,
  ModalKey,
  children,
  message,
}) => {
  const t = useTranslations("model");
  
  return (
    <Modal>
      <Modal.Open opens={ModalKey}>{children}</Modal.Open>
      <Modal.Window name={ModalKey} className="w-fit bg-white rounded-sm p-5">
        <AnimateScale className=" text-gray-600 w-full">
          <AiOutlineInfoCircle size={100} className="mx-auto" />
        </AnimateScale>
        <AnimateFromToRight>
          <p className="text-center w-[25rem] font-unset text-gray-600 my-3 px-3">
            {message}
          </p>
        </AnimateFromToRight>
        <div className="gap-2 flex justify-center ">
          <AnimateButton
            scale={0.9}
            className="px-3 py-1 bg-primary hover:bg-primary-hover text-white transition-all duration-100 cursor-pointer hover:opacity-75   "
            onClick={() => handleApply()}
          >
            {t('apply')}
          </AnimateButton>
          <Modal.Close>
            <AnimateButton
              scale={0.9}
              className="px-3 py-1 bg-white text-red-600 border-1 transition-all duration-100 border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
            >
              {t('cancel')}
            </AnimateButton>
          </Modal.Close>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default ConfirmModal;
