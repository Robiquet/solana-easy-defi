import React from "react";
import { Chart } from "react-charts";

const LineChart = ({ dataSets, yLabel }) => {
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

  const cursor = React.useMemo(
    () => ({
      showLabel: true,
      showLine: true,
      snap: true,
    }),
    []
  );

  return (
    <div className="bg-indigo-500 rounded-xl p-4 flex items-center	 justify-center">
      <div style={{ transform: "rotate(-90deg)" }}>{yLabel}</div>
      <div
        style={{
          width: "60vw",
          height: "80vh",
        }}
      >
        <Chart data={memoData} axes={axes} series={series} tooltip />
      </div>
    </div>
  );
};

export default LineChart;
