import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabbedChart, {
  ChartTab,
  ChartTabData,
  TabbedChartConfig,
} from "../components/TabbedChart";

interface PoolAPIDetails {
  drawdown: PoolMetric;
  il: PoolMetric;
  pnl: PoolMetric;
  tokenAprice: PoolMetric;
  tokenBprice: PoolMetric;
}

interface PoolMetric {
  timestamp: string[];
  value: number[];
}

const PoolChart = () => {
  const { id } = useParams<{ id: string }>();
  const [poolChartData, setPoolChartData] = useState();
  const [chartConfig, setChartConfig] = useState<TabbedChartConfig>();

  useEffect(() => {
    async function getPoolDetails() {
      const response = await fetch(`https://api.radardefi.com/pool/${id}`);
      const json = await response.json();
      setPoolChartData(json);
      const tabConfig = createChartConfig(json);
      setChartConfig(tabConfig);
    }

    getPoolDetails();
  }, []);

  const createChartConfig: (data: PoolAPIDetails) => TabbedChartConfig = (
    data
  ) => {
    const tabs: ChartTab[] = [];
    const drawDownTabData: ChartTabData[] = [];
    data.drawdown.timestamp.forEach((time, index) => {
      drawDownTabData.push({
        x: new Date(time),
        y: data.drawdown.value[index],
      });
    });

    tabs.push({
      title: "drawdown",
      data: drawDownTabData,
    });

    const ilData: ChartTabData[] = [];
    data.il.timestamp.forEach((time, index) => {
      ilData.push({
        x: new Date(time),
        y: data.il.value[index],
      });
    });

    tabs.push({
      title: "il",
      data: ilData,
    });

    return { tabs: tabs };
  };

  return (
    <div className="mt-4">
      {chartConfig ? <TabbedChart config={chartConfig}></TabbedChart> : <></>}
    </div>
  );
};

export default PoolChart;
