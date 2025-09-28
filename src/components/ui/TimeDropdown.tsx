import { useRef, useEffect } from "react";

type TimeDropdownProps = {
  values: string[];
  selected: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  selectedRef: React.RefObject<HTMLLIElement>;
};

export default function TimeDropdown({
  values,
  selected,
  isOpen,
  onToggle,
  onSelect,
  selectedRef,
}: TimeDropdownProps) {
  const ulRef = useRef<HTMLUListElement>(null);

  // Reduce scroll speed
  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // stop default scroll
      const slowFactor = 0.3; // 30% of normal speed
      ul.scrollTop += e.deltaY * slowFactor;
    };

    ul.addEventListener("wheel", handleWheel, { passive: false });
    return () => ul.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  return (
    <div className="relative">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="cursor-pointer border rounded px-3 py-1 bg-white"
      >
        {selected || "--"}
      </div>
      {isOpen && (
        <ul
          ref={ulRef}
          className={`fixed left-[${ulRef.current?.clientLeft}px] top-[${ulRef.current?.clientTop}px] max-h-[100px] overflow-auto bg-white shadow rounded z-[50]`}
          style={{ scrollbarWidth: "none" }}
        >
          {values.map((value) => (
            <li
              key={value}
              ref={value === selected ? selectedRef : null}
              className={`px-3 py-1 cursor-pointer ${
                value === selected
                  ? "bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(value);
                onToggle();
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
