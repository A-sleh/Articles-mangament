"use client";

import React from "react";
import { useTranslations } from "next-intl";

import WorkingTimesProvider from "@/context/workingHours/WorkingTimesProvider";
import WorkinHoursList from "./WorkinHoursList";

export default function WorkingHoursLayout() {
  const t = useTranslations("working-hours");
  
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <header className="flex bg-primary dark:bg-primary-dark text-white rounded-md overflow-hidden border border-primary">
        <span className=" px-8 py-2 bg-white text-primary dark:text-primary-dark font-semibold">
          {t("day")}
        </span>
        <span className="flex-2 px-4 py-2 font-semibold">
          {t("work-time-title")}
        </span>
      </header>
      {/* Work Hours Rows */}
      <WorkingTimesProvider>
        <WorkinHoursList />
      </WorkingTimesProvider>
    </div>
  );
}
