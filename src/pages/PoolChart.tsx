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

    tabs.push({
      title: "Drawdown",
      data: mapResponseToChartData(data.drawdown),
    });

    tabs.push({
      title: "Impermanent Loss",
      data: mapResponseToChartData(data.il),
    });

    tabs.push({
      title: "Profit & Loss",
      data: mapResponseToChartData(data.pnl),
    });

    return { tabs: tabs };
  };

  const mapResponseToChartData: (metric: PoolMetric) => ChartTabData[] = (
    metric
  ) => {
    const data: ChartTabData[] = [];
    metric.timestamp.forEach((time, index) => {
      data.push({
        x: new Date(time),
        y: metric.value[index],
      });
    });

    return data;
  };

  return (
    <div className="mt-4">
      {chartConfig ? <TabbedChart config={chartConfig}></TabbedChart> : <></>}
    </div>
  );
};

export default PoolChart;
