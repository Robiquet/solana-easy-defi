import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabbedChart, {
  ChartTab,
  ChartTabData,
  TabbedChartConfig,
} from "../components/TabbedChart";
import { calculateAverageMagnitude } from "../utils/calculate-average-magintude";

interface PoolAPIDetails {
  drawdown: PoolMetric;
  il: PoolMetric;
  pnl: PoolMetric;
  holdPnl: PoolMetric;
  tokenAprice: PoolMetric;
  tokenBprice: PoolMetric;
}

interface PoolMetric {
  timestamp: string[];
  value: number[];
}

const PoolChart = () => {
  const { id } = useParams<{ id: string }>();
  const [chartConfig, setChartConfig] = useState<TabbedChartConfig>();

  useEffect(() => {
    async function getPoolDetails() {
      const response = await fetch(`https://api.radardefi.com/pool/${id}`);
      const json = await response.json();
      const tabConfig = createChartConfig(json);
      setChartConfig(tabConfig);
    }

    getPoolDetails();
  }, []);

  const createChartConfig: (data: PoolAPIDetails) => TabbedChartConfig = (
    data
  ) => {
    const tabs: ChartTab[] = [];

    const tokenAAverage = calculateAverageMagnitude(data.tokenAprice.value);
    const tokenBAverage = calculateAverageMagnitude(data.tokenBprice.value);

    tabs.push({
      title: "Price of tokens",
      dataSets:
        tokenAAverage > tokenBAverage
          ? [
              mapResponseToChartData(data.tokenBprice),
              mapResponseToChartData(data.tokenAprice),
            ]
          : [
              mapResponseToChartData(data.tokenAprice),
              mapResponseToChartData(data.tokenBprice),
            ],
    });

    tabs.push({
      title: "Impermanent Loss",
      dataSets: [mapResponseToChartData(data.il)],
    });

    const pnlAverage = calculateAverageMagnitude(data.pnl.value);
    const holdPnlAverage = calculateAverageMagnitude(data.holdPnl.value);

    tabs.push({
      title: "Profit & Loss",
      dataSets:
        pnlAverage > holdPnlAverage
          ? [
              mapResponseToChartData(data.holdPnl),
              mapResponseToChartData(data.pnl),
            ]
          : [
              mapResponseToChartData(data.pnl),
              mapResponseToChartData(data.holdPnl),
            ],
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
    <div className="mt-4 ml-4">
      {chartConfig ? <TabbedChart config={chartConfig}></TabbedChart> : <></>}
    </div>
  );
};

export default PoolChart;
