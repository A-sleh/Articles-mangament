"use client";

import { useState } from "react";

import DatePicker from "@/components/ui/DatePicker";
import Chart from "@/components/charts/Chart";

import { useArticles } from "@/stores/Article-store/Articles-store";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { convertDateToTimeStamp, getDayName } from "@/utils/helper";
import { useTranslations } from "next-intl";

export default function ArticlesStatistcs() {
  const t = useTranslations("stats");

  const locale = useNavSetting((state) => state.lang);
  const articles = useArticles((state) => state.getAllArticles());

  // Make the intial date based on min and max article date
  const dates = articles.map((a) => new Date(a.scheduled|| ''));
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const filterdArticles = articles.filter(
    (artcle) =>
      convertDateToTimeStamp(artcle.scheduled || '') >=
        convertDateToTimeStamp(startDate) &&
      convertDateToTimeStamp(artcle.scheduled || '') <=
        convertDateToTimeStamp(endDate)
  );

  const categoryMap: Record<string, number> = {};
  filterdArticles.forEach((a) => {
    categoryMap[a.category] = (categoryMap[a.category] || 0) + 1;
  });

  const viewsMap: Record<string, number> = {};
  filterdArticles.forEach((a) => {
    const day = getDayName(
      new Date(a.scheduled || ''),
      locale == "ar" ? "ar-SA" : "en-US"
    );
    viewsMap[day] = (viewsMap[day] || 0) + Number(a.views);
  });

  return (
    <div className="p-6 space-y-8">
      {/* Date Range Filter */}
      <div>
        <h3 className="mb-1">{t("pick-range-date-filter")}</h3>
        <div className="flex gap-4 items-center">
          <div>
            <DatePicker
              selectedDate={startDate}
              setSelectedDate={setStartDate}
            />
          </div>
          <div>
            <DatePicker selectedDate={endDate} setSelectedDate={setEndDate} />
          </div>
        </div>
      </div>

      <section className="flex flex-col md:flex-row gap-2 transition-all">
        {/* Articles per Category */}
        <div className="bg-white shadow p-4 rounded-2xl flex-1">
          <h2 className="text-xl mb-2 font-semibold">
            {t("articles-per-category-chart-title")}
          </h2>
          <Chart
            type="pie"
            width="300"
            heigth="300"
            className="flex justify-center"
            series={Object.values(categoryMap)}
            options={{
              labels: Object.keys(categoryMap),
              legend: { position: "bottom" },
            }}
          />
        </div>

        {/* Mock Views per Day */}
        <div className="bg-white shadow p-4 rounded-2xl flex-1">
          <h2 className="text-xl mb-2 font-semibold">
            {t("views-per-day-chart-title")}
          </h2>

          <Chart
            className="flex justify-center"
            type="line"
            width="300"
            heigth="300"
            series={[
              {
                name: "Views",
                data: Object.values(viewsMap),
              },
            ]}
            options={{
              xaxis: { categories: Object.keys(viewsMap) },
              stroke: { curve: "smooth" },
            }}
          />
        </div>
      </section>
    </div>
  );
}
