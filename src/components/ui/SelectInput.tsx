import { MdClose } from "react-icons/md";

type SelectType = {
  label: string;
  onChange: (e: any) => void;
  value?: string | number;
  values: (string | number)[];
  multiSelect?: string[];
  register?: any;
  onRemoveElement?: (item: string) => void
};

export default function SelectInput({
  onChange,
  values,
  label,
  value,
  register,
  multiSelect,
  onRemoveElement,
  ...props
}: SelectType) {
  return (
    <div className="flex flex-col  w-full">
      <label className="text-primary dark:text-white mb-1">{label}</label>
      <select
        onChange={onChange}
        value={value}
        {...props}
        {...register}
        className="px-4 py-2 bg-white text-secondary-dark dark:text-white dark:bg-transparent placeholder:text-sm dark:placeholder:text-secondary-dark dark:border dark:border-white outline-hidden shadow-sm rounded-sm"
      >
        <option disabled value=""></option>
        {values?.map((value) => {
          if (multiSelect && multiSelect.includes(value.toString()))
            return ;
          return (
            <option
              value={value}
              key={value}
              className="text-shadow-amber-200 dark:text-primary-dark"
            >
              {value}
            </option>
          );
        })}
      </select>

      {multiSelect && (
        <div className="flex gap-1 flex-wrap my-1">
          {multiSelect?.map((val) => (
            <p
              className="px-2 py-1 rounded-md text-white bg-primary dark:bg-secondary-dark dark:text-primary-dark flex  text-sm"
              key={val}
            >
              {val}
              <button onClick={() => onRemoveElement?.(val)} className="flex justify-end w-full p-1 cursor-pointer text-white">
                <MdClose size={14} />
              </button>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
