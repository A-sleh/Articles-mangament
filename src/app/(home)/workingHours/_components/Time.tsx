"use client";

import React, { useState } from "react";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import {
  newRangePayload,
  Times,
  useWorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";

import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import TimesInput from "./TimesInput";
import { IoIosClose } from "react-icons/io";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

export default function Time({ range }: { range: newRangePayload }) {
  const [updateTime, setUpdateTime] = useState(false);
  const [startTime, setStartTime] = useState<Times>(range.start);
  const [endTimes, setEndTimes] = useState<Times>(range.end);
  const user = useAuth((state) => state.user);
   const lang = useNavSetting(state => state.lang)

  const { deleteRangeTime } = useWorkingHours((state) => state);
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updateTime) return;
  };

  return (
    <form
      onSubmit={(e) => onsubmit(e)}
      className={`px-2  rounded-sm flex gap-1 items-center ${
        updateTime ? "border-0" : "border-r-1 border-l-1 border-primary"
      }  transition-all`}
    >
      <div className="flex gap-1 items-center">
        {!updateTime ? (
          <span className="p-1">{`${startTime.hours}:${startTime.minutes}`}</span>
        ) : (
          <TimesInput setTimes={setStartTime} times={startTime} />
        )}
        <MdOutlineArrowForwardIos size={13} className={`text-primary my-2 ${lang == 'ar'? 'rotate-180': ''} `} />
        {!updateTime ? (
          <span className="p-1">{`${endTimes.hours}:${endTimes.minutes}`}</span>
        ) : (
          <TimesInput setTimes={setEndTimes} times={endTimes} />
        )}
      </div>
      <div className="flex gap-1 items-center">
        {!updateTime ? (
          <>
            <FaPencilAlt
              size={12}
              className="text-blue-400 cursor-pointer"
              onClick={() => setUpdateTime(true)}
            />
            <AiOutlineDelete
              size={12}
              className="text-red-400 cursor-pointer"
              onClick={() => deleteRangeTime(user?.id || 0, range)}
            />
          </>
        ) : (
          <>
            <FaCheck size={12} className="text-green-600 cursor-pointer" />
            <IoIosClose
              size={22}
              className="text-red-600 cursor-pointer"
              onClick={() => setUpdateTime(false)}
            />
          </>
        )}
      </div>
    </form>
  );
}
