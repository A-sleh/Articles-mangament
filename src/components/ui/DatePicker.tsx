// @ts-nocheck

import { Dispatch, SetStateAction, useRef } from "react";

import DatePickerApi, { DatePicker } from "react-datepicker";
import { MdDateRange } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}) {
  const dateRef = useRef<null | DatePicker>(null);
  return (
    <div className=" px-4 py-2 bg-primary justify-between items-center dark:bg-primary-dark text-white outline-hidden roudned-md focus:shadow-md rounded-md flex ">
      <DatePickerApi
        ref={dateRef}
        selected={selectedDate}
        className="outline-none w-fit"
        onChange={(date) => setSelectedDate(date || new Date())}
      />
      <MdDateRange
        onClick={() => dateRef.current?.click()}
        size={30}
        className="p-2 rounded-md bg-white text-primary dark:text-primary-dark"
      />
    </div>
  );
}
