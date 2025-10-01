"use client"

import Chart from "react-apexcharts";

export default function BarChart() {
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,2000],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };
  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width="500"
    />
  );
}
