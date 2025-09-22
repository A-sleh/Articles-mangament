type SelectType = {
  label: string;
  onChange: (e: any) => void;
  values: (string | number)[];
  multiSelect?: string[];
  register?: any;
};

export default function SelectInput({
  onChange,
  values,
  label,
  register,
  multiSelect,
  ...props
}: SelectType) {
  return (
    <div className="flex flex-col  w-full">
      <label className="text-white">{label}</label>
      <select
        onChange={onChange}
        {...props}
        {...register}
        className="p-2 bg-white text-shadow-amber-200 outline-hidden rounded-md"
      >
        {values?.map((value) => (
          <option value={value} key={value} className="text-shadow-amber-200">
            {value}
          </option>
        ))}
      </select>

      {multiSelect && (
        <div className="flex gap-1 flex-wrap my-1">
          {multiSelect?.map((val) => (
            <p className="px-2 py-1 rounded-md bg-white text-primary" key={val}>
              {val}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
