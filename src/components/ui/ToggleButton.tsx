export default function ToggleButton({
  value,
  onChangeFn,
}: {
  value: boolean;
  onChangeFn: () => void;
}) {
  return (
    <div
      className={`h-8 rounded-3xl w-15 items-center bg-amber-300 p-1 flex ${
        value? "justify-end" : "justify-start"
      } transition-all cursor-pointer`}
      onClick={onChangeFn}
    >
      <span className={`rounded-full bg-yellow-200  h-[25px] w-[25px] `}></span>
    </div>
  );
}
