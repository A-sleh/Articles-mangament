"use client";

import { inputType } from "./Input";

export default function MainInput({
  label,
  type,
  placeHolder,
  required = false,
  ...props
}: inputType) {
  return (
    <div className="mb-2 flex flex-col rounded-md w-full">
      <label className="text-left text-white font-bold">{label}</label>
      <input
        className="px-4 py-2 bg-white outline-none roudned-md focus:shadow-md"
        type={type}
        placeholder={placeHolder}
        required={required}
        {...props}
      />
    </div>
  );
}
