
import { Dispatch, SetStateAction } from "react";

import DatePickerApi from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({
  selectedDate,
  setSelectedDate,
  placeHolder
}: {
  selectedDate: Date;
  placeHolder: string;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}) {
  return (
    <div className="outline-none px-4 py-2 bg-white outline-hidden roudned-md focus:shadow-md rounded-md">
        <DatePickerApi
        selected={selectedDate || placeHolder}
        onChange={(date) => setSelectedDate(date || new Date())}
        />
    </div>
  );
}
