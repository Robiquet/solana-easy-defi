import { useState } from "react";
import LineChart from "./LineChart.js";

interface TabbedChartConfig {
  tabs: {
    title: string;
    data: { x: any; y: any }[];
  }[];
}

const TabbedChart = ({ config }: { config?: TabbedChartConfig }) => {
  //mock data
  config = {
    tabs: [
      {
        title: "Drawdown",
        data: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 2,
            y: 5,
          },
          {
            x: 3,
            y: 10,
          },
          { x: 4, y: 5 },
        ],
      },
      {
        title: "Price of Asset",
        data: [
          {
            x: 2,
            y: 2,
          },
          {
            x: 3,
            y: 5,
          },
          { x: 4, y: 5 },
        ],
      },
      {
        title: "Sharpe Ratio",
        data: [
          {
            x: 1,
            y: 1,
          },
          {
            x: 2,
            y: 5,
          },
          { x: 6, y: 4 },
        ],
      },
    ],
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabSelection = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="flex">
      <LineChart data={config.tabs[tabIndex].data}></LineChart>
      <div className="flex flex-col ml-2 space-y-2">
        <h4 className="font-bold text-lg mt-2">Metrics</h4>
        {config.tabs.map((tab, index) => (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-1 px-1 rounded-full w-44"
            key={index}
            onClick={() => handleTabSelection(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabbedChart;
