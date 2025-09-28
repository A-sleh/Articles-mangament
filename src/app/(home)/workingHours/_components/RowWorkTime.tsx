"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  DayKey,
  useWorkingHours,
  WorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";
import { IoIosAddCircleOutline } from "react-icons/io";

import Time from "./Time";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import AddNewTimeFrom from "./AddNewTimeFrom";

export default function RowWorkTime({
  workTime,
  dayKey,
}: {
  workTime: WorkingHours;
  dayKey: DayKey;
}) {
  const user = useAuth((state) => state.user);
  const { changeDayStatus } = useWorkingHours((state) => state);
  const [addNewTime, setAddNewTime] = useState(false);
  const { register, handleSubmit } = useForm();
  const t = useTranslations("working-hours");

  return (
    <div
      className={`${
        workTime.isActive ? "opacity-100" : "opacity-35"
      } p-3 border-2 border-dashed border-primary  flex items-center`}
    >
      <span className="flex gap-2 ">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={workTime.isActive}
          onChange={() => changeDayStatus(user?.id || 0, dayKey)}
        />
        {t(`days.${dayKey}`)}
      </span>
      <div className="flex gap-2 justify-between items-center w-full">
        <div className="flex gap-2 items-center mx-2 overflow-auto" style={{scrollbarWidth: 'none '}}>
          {workTime.ranges.map((range) => (
            <Time range={{...range,day: dayKey}} />
          ))}
        </div>
        {/* <AddNewTimeFrom /> */}
        <AddNewTimeFrom dayKey={dayKey}>
          <IoIosAddCircleOutline size={25} />
        </AddNewTimeFrom>
      </div>
    </div>
  );
}
