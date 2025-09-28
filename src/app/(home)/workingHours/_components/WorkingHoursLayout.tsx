"use client";

import { useAuth } from "@/stores/Auth-store/Auth-srore";
import {
  DayKey,
  useWorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";
import RowWorkTime from "./RowWorkTime";
import React from "react";
import { useTranslations } from "next-intl";

export default function WorkingHoursLayout() {

  const user = useAuth((state) => state.user);
  const { getUserWorkingHours } = useWorkingHours((state) => state);
  const t = useTranslations('working-hours')

  const userWorkingHours = getUserWorkingHours(user?.id || 0);

  return (
    <div>

      <header className="flex p-1 bg-primary text-white rounded-sm gap-2">
        <span className="px-4 rounded-sm py-1 bg-white text-primary">{t('day')}</span>
        <span className="px-4 rounded-sm py-1">{t('work-time-title')}</span>
      </header>

      <section className="flex flex-col space-y-2 mt-2">
        {Object.keys(userWorkingHours.days).map((key) => {
          const dayKey: DayKey = key as DayKey;
          return <RowWorkTime workTime={userWorkingHours.days[dayKey]} dayKey={dayKey} />;
        })}
      </section>
    </div>
  );
}
