import { useState } from "react";
import LineChart from "./LineChart.js";

export interface TabbedChartConfig {
  tabs: ChartTab[];
}

export interface ChartTab {
  title: string;
  yLabel: string;
  dataSets: ChartTabData[][];
}

export interface ChartTabData {
  x: any;
  y: any;
}

const TabbedChart = ({ config }: { config?: TabbedChartConfig }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabSelection = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="flex">
      <LineChart
        dataSets={config?.tabs[tabIndex].dataSets}
        yLabel={config?.tabs[tabIndex].yLabel}
      ></LineChart>
      <div className="flex flex-col ml-2 space-y-2">
        <h4 className="font-bold text-lg mt-2">Metrics</h4>
        {config?.tabs.map((tab, index) => (
          <button
            className="bg-cyan hover:bg-blue-700 text-sm text-white font-bold py-1 px-1 rounded-full w-44"
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
