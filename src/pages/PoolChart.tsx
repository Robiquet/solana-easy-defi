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
  investUrl: string;
}

interface PoolMetric {
  timestamp: string[];
  value: number[];
}

const PoolChart = () => {
  const { id } = useParams<{ id: string }>();
  const [chartConfig, setChartConfig] = useState<TabbedChartConfig>();
  const [investUrl, setInvestUrl] = useState<string>();

  useEffect(() => {
    async function getPoolDetails() {
      const response = await fetch(`https://api.radardefi.com/pool/${id}`);
      const json: PoolAPIDetails = await response.json();
      const tabConfig = createChartConfig(json);
      setChartConfig(tabConfig);
      setInvestUrl(json.investUrl);
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
      title: "Impermanent Loss",
      yLabel: "Loss(%)",
      dataSets: [mapResponseToChartData(data.il)],
    });

    tabs.push({
      title: "Profit & Loss",
      yLabel: "Profit($)",
      dataSets: [mapResponseToChartData(data.pnl)],
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

  const handleInvestClick = () => {
    if (investUrl) window.location.href = investUrl;
  };

  return (
    <div className="mt-4 ml-4">
      {chartConfig ? <TabbedChart config={chartConfig}></TabbedChart> : <></>}
      <button
        className="bg-blue-500 shadow-2xl hover:bg-blue-700 text-sm text-white font-bold py-1 px-1 rounded-full w-32 mt-4 "
        onClick={() => handleInvestClick()}
      >
        Invest
      </button>
    </div>
  );
};

export default PoolChart;
