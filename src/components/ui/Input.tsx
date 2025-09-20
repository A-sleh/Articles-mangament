"use client";

export type inputType = {
  type: string;
  placeHolder?: string;
  label: string;
  required?: boolean;
  value?: string;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  type,
  placeHolder,
  required = false,
  ...props
}: inputType) {
  return (
    <div className="mb-2 flex flex-col rounded-md ">
      <label className="">{label}</label>
      <input
        className="px-4 py-2 bg-white outline-amber-200"
        type={type}
        placeholder={placeHolder}
        required={required}
        {...props}
      />
    </div>
  );
}
