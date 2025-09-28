"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import {
  DayKey,
  Times,
  useWorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";

import Model from "@/components/Model/Model";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {
  delayChangeState,
  genterateTimes,
  isTimeRangeValid,
} from "@/utils/helper";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import TimesInput from "./TimesInput";
import { errorToast, successToast } from "@/components/custom/toast";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

const initialTime: Times = {
  hours: "",
  minutes: "",
};

export default function AddNewTimeForm({
  children,
  dayKey,
}: {
  children: React.ReactElement;
  dayKey: DayKey;
}) {
  const t = useTranslations("working-hours");
  const user = useAuth((state) => state.user);
  const lang = useNavSetting(state => state.lang)
  const { addNewRange } = useWorkingHours((state) => state);
  const [startTime, setStartTime] = useState<Times>(initialTime);
  const [endTimes, setEndTimes] = useState<Times>(initialTime);
  const [closeModel, setCloseModel] = useState(false);

  async function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await addNewRange(user?.id || 0, {
        id: 0,
        start: startTime,
        end: endTimes,
        day: dayKey,
      });
      successToast(t("add-new-range-noti-success"));
      delayChangeState(setCloseModel);
    } catch (err) {
      errorToast(t("add-new-range-noti-error"));
    }
  }

  useEffect(() => {
    // Reset the times when close the model
    return () => {
      setStartTime(initialTime);
      setEndTimes(initialTime);
    };
  }, []);

  return (
    <Model outCloseAction={closeModel}>
      <Model.Open opens="new-range-time">{children}</Model.Open>
      <Model.Window name="new-range-time">
        <div className="flex flex-col items-center  rounded-md bg-white text-primary w-full  md:min-w-[30vw] overflow-hidden ">
          <h3 className="mb-4 text-lg font-semibold">{t("pick-time")}</h3>
          <form
            onSubmit={handleOnSubmit}
            className="relative flex flex-col w-full items-center bg-white p-2 gap-6 overflow-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-2 items-end" >
              <TimesInput
                times={startTime}
                setTimes={setStartTime}
                label={t("start-time")}
              />
              <MdOutlineArrowForwardIos size={20} className={`text-primary my-2 ${lang == 'ar'? 'rotate-180': ''} `} />
              <TimesInput
                times={endTimes}
                setTimes={setEndTimes}
                label={t("end-time")}
              />
            </div>
            <div className="flex gap-1 self-end">
              <button
                type="submit"
                className="ml-2 px-4 py-1 bg-primary text-white rounded cursor-pointer"
              >
                {t("add")}
              </button>
            </div>
          </form>
        </div>
      </Model.Window>
    </Model>
  );
}
