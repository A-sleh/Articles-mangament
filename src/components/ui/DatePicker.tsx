
import { Dispatch, SetStateAction } from "react";

import DatePickerApi from "react-datepicker";
import { MdDateRange } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";



export default function DatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}) {
  return (
    <div className="outline-none px-4 py-2 bg-primary dark:bg-primary-dark text-white outline-hidden roudned-md focus:shadow-md rounded-md">
        <DatePickerApi
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date || new Date())}
        />
        <MdDateRange size={20} className="p-2 rounded-md bg-white text-primary dark:text-primary-dark" />
    </div>
  );
}
