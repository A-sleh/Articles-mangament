import { inputType } from "./Input";

export default function MainInput({
  label,
  type,
  placeHolder,
  required = false,
  readOnly = false,
  register,
  ...props
}: inputType) {

  return (
    <div className="mb-2 flex flex-col rounded-md w-full">
      <label className="text-white ">{label}</label>
      <input
        className="px-4 py-2 bg-white outline-hidden roudned-md focus:shadow-md rounded-md"
        readOnly={readOnly}
        type={type}
        placeholder={placeHolder}
        required={required}
        {...props}
        {...register}
      />
    </div>
  );
}
