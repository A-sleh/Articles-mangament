export default function SubHeader({
  title,
  withUnderLine = true,
}: {
  title: string;
  withUnderLine?: boolean;
}) {
  return (
    <h1 className="relative text-md dark:text-white font-normal w-full">
      {title}
      {withUnderLine && (
        <span className="w-full h-[1px] bg-primary dark:bg-primary-dark block rounded-sm"></span>
      )}
    </h1>
  );
}
