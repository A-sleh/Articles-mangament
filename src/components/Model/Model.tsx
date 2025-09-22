"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import AnimateScale from "@/lib/Animation/AnimateScale";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

type openProps = {
  children: React.ReactElement;
  opens: string;
};

type windowProps = {
  children: React.ReactNode;
  name: string;
  title?: string | null;
  className?: string;
};

type modelContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModelContext = createContext<modelContextType>({} as modelContextType);

function Model({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;

  return (
    <ModelContext.Provider value={{ open, close, openName }}>
      {children}
    </ModelContext.Provider>
  );
}

function Open({ children, opens: openWindowName }: openProps) {
  const { open } = useContext(ModelContext);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Close({ children }: { children: React.ReactNode }) {
  const { close } = useContext(ModelContext);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return cloneElement(children, { onClick: () => close() });
}

function Window({ children, name, title = null, className = "" }: windowProps) {
  const isDarkMode = useNavSetting((state) => state.isDarkMod);
  const { openName, close } = useContext(ModelContext);

  if (name !== openName) return null;

  return createPortal(
    <div
      className={`bg-[#0000004d] fixed top-0 left-0 right-0 bottom-0 h-screen z-50 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <AnimateScale
        className={`fixed top-[50%] left-[50%] translate-[-50%] p-2 bg-third rounded-bl-md rounded-br-md  overflow-auto ${className}`}
      >
        <button className="flex justify-between items-center w-fit bg-white p-1 rounded-tl-md rounded-tr-md cursor-pointer">
          <MdClose size={24} className=" cursor-pointer" onClick={close} />
        </button>
        {children}
      </AnimateScale>
    </div>,
    document.body
  );
}

Model.Open = Open;
Model.Close = Close;
Model.Window = Window;

export default Model;
