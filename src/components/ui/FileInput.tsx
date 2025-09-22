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
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mb-2 flex flex-col rounded-md w-full">
      <label className="text-left  text-white font-bold">{label}</label>
      <div className=" bg-white p-1 flex justify-between roudned-md focus:shadow-md border-2 ">
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
          className="p-1 cursor-pointer bg-primary rounded-md dark:bg-secondary-dark text-white text-nowrap"
          style={{ lineHeight: "-10px" }}
        >
          Upload file
        </span>
      </div>
      <input type="file" className="hidden" ref={inputRef} {...props} />
    </div>
  );
}
