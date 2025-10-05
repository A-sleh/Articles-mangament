export default function ToggleButton({
  value,
  onChangeFn,
  className,
  buttonStyle = '',
  id = ''
}: {
  value: boolean;
  onChangeFn: () => void;
  className?: string;
  buttonStyle?: string;
  id?: string;
}) {
  return (
    <div
      className={`fit-content rounded-3xl w-15 cursor-pointer items-center bg-primary dark:bg-secondary-dark dark:border-primary-dark dark:border-2  p-1 flex ${
        value ? "justify-end" : "justify-start"
      } transition-all cursor-pointer ${className}`}
      onClick={onChangeFn}
      id={id}
    >
      <span className={`rounded-full bg-white h-[25px] w-[25px] ${buttonStyle}`}></span>
    </div>
  );
}
