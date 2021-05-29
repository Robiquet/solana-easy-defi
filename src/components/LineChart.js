import React from "react";
import { Chart } from "react-charts";

const LineChart = ({ data }) => {
  const memoData = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: data.map((item) => [item.x, item.y]),
      },
    ],
    [data]
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "utc",
        position: "bottom",
        showGrid: false,
        showTicks: true,
      },
      { type: "linear", position: "left", showGrid: false, showTicks: true },
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      type: "area",
    }),
    []
  );

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <Chart data={memoData} axes={axes} series={series} />
    </div>
  );
};

export default LineChart;
