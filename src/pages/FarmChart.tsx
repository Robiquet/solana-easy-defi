import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabbedChart, {
  ChartTab,
  ChartTabData,
  TabbedChartConfig,
} from "../components/TabbedChart";
import { calculateAverageMagnitude } from "../utils/calculate-average-magintude";

interface FarmAPIDetails {
  drawdown: FarmMetric;
  pnl: FarmMetric;
  tokenAprice: FarmMetric;
  tokenBprice: FarmMetric;
}

interface FarmMetric {
  timestamp: string[];
  value: number[];
}

const FarmChart = () => {
  const { id } = useParams<{ id: string }>();
  const [chartConfig, setChartConfig] = useState<TabbedChartConfig>();

  useEffect(() => {
    async function getFarmDetails() {
      const response = await fetch(`https://api.radardefi.com/farm/${id}`);
      const json = await response.json();
      const tabConfig = createChartConfig(json);
      setChartConfig(tabConfig);
    }

    getFarmDetails();
  }, []);

  const createChartConfig: (data: FarmAPIDetails) => TabbedChartConfig = (
    data
  ) => {
    const tabs: ChartTab[] = [];

    const tokenAAverage = calculateAverageMagnitude(data.tokenAprice.value);
    const tokenBAverage = calculateAverageMagnitude(data.tokenBprice.value);

    tabs.push({
      title: "Price of tokens",
      yLabel: "Price($)",
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
      title: "Profit & Loss",
      yLabel: "Profit($)",
      dataSets: [mapResponseToChartData(data.pnl)],
    });

    return { tabs: tabs };
  };

  const mapResponseToChartData: (metric: FarmMetric) => ChartTabData[] = (
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

export default FarmChart;
