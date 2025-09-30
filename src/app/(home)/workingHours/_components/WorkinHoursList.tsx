"use client"

import React from "react";

import { useTimesHours } from "@/context/workingHours/WorkingTimesProvider";
import { DayKey } from "@/stores/Working-hours-store/WorkingHoursStore";

import RowWorkTime from "./RowWorkTime";

export default function WorkinHoursList() {
  const { workingTimes } = useTimesHours();

  return (
    <section className="flex flex-col gap-3">
      {Object.keys(workingTimes.days).map((key) => {
        const dayKey: DayKey = key as DayKey;
        return (
          <RowWorkTime
            key={dayKey}
            workTime={workingTimes.days[dayKey]}
            dayKey={dayKey}
          />
        );
      })}
    </section>
  );
}
