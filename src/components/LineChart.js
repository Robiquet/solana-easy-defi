import React from "react";
import { Chart } from "react-charts";

const LineChart = ({ dataSets }) => {
  const memoData = React.useMemo(
    () =>
      dataSets.map((dataSet, index) => {
        return {
          label: index.toString(),
          data: dataSet.map((item) => [item.x, item.y]),
        };
      }),
    [dataSets]
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
    <div className="bg-indigo-900 rounded-xl p-4">
      <div
        style={{
          width: "60vw",
          height: "80vh",
        }}
      >
        <Chart data={memoData} axes={axes} series={series} />
      </div>
    </div>
  );
};

export default LineChart;
