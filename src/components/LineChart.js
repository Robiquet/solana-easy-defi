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
        type: "linear",
        position: "bottom",
        showGrid: false,
        showTicks: false,
      },
      { type: "linear", position: "left", showGrid: false, showTicks: false },
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
