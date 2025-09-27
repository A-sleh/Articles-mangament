import { useTranslations } from "next-intl"
import { useRef } from "react";
import { inputType } from "./Input";

export default function FileInput({
  label,
  placeHolder,
  required = false,
  register,
  value,
  ...props
}: Omit<inputType, "type">) {
  const t = useTranslations("components.FileInput")
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mb-2 flex flex-col rounded-md w-full overflow-hidden">
      <label className="text-white ">{label}</label>
      <div className=" bg-white p-1 flex justify-between focus:shadow-md border-2 ">
        {value == "" ? (
          <p className="px-4 py-1 text-nowrap max-w-[20rem] overflow-hidden text-[#5252528e]">
            {placeHolder}
          </p>
        ) : (
          <p className="px-4 py-1 text-nowrap max-w-[20rem] overflow-hidden ">
            {value}
          </p>
        )}
        <span
          onClick={() => inputRef.current?.click()}
          title={t('upload-file')}
          className="p-1 cursor-pointer bg-primary rounded-md dark:bg-secondary-dark text-white text-nowrap "
          style={{ lineHeight: "-10px" }}
        >
          {t('upload-file')}
        </span>
      </div>
      <input type="file" className="hidden" ref={inputRef} {...props} />
    </div>
  );
}
