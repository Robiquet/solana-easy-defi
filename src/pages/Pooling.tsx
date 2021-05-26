import { useEffect, useState } from "react";
import Dropdown, { DropdownOption } from "../components/Dropdown";
import PoolCard, { PoolDetails } from "../components/PoolCard";

const Pooling = () => {
  const [pools, setPools] = useState<PoolDetails[]>([]);
  const [usdAmount, setUsdAmount] = useState<number>();
  const [timePeriod, setTimePeriod] = useState<number>();

  const timeOptions = [
    {
      text: "1 Week",
      value: 1 / 52,
    },
    {
      text: "1 Month",
      value: 1 / 12,
    },
    {
      text: "6 Months",
      value: 0.5,
    },
    {
      text: "1 Year",
      value: 1,
    },
  ];

  useEffect(() => {
    async function checkConnection() {
      const response = await fetch("https://api.radardefi.com/pools");
      const json = await response.json();
      setPools(json);
    }

    checkConnection();
  }, []);

  useEffect(() => {
    recalulatePoolReturns();
  }, [timePeriod, usdAmount]);

  const handleUsdChange = (event: any) => {
    setUsdAmount(event.target.value);
  };

  const handleTimePeriodChange = (option: DropdownOption | undefined) => {
    setTimePeriod(option?.value);
  };

  const recalulatePoolReturns = () => {
    const newPools = pools.map((pool) => {
      return {
        ...pool,
        totalYield:
          timePeriod && usdAmount
            ? calculateYield(timePeriod, usdAmount, pool)
            : undefined,
      };
    });

    setPools(newPools);
  };

  const calculateYield = (
    timePeriod: number,
    usdAmount: number,
    pool: PoolDetails
  ): number => {
    return Math.round(timePeriod * usdAmount * pool.apy * 0.01);
  };

  return (
    <div className="flex flex-col md:h-screen ml-4 flex-grow mt-4 ">
      <div className="font-bold text-2xl mb-4">Choose a Pool</div>
      <div className="flex space-x-5 mb-5">
        <input
          value={usdAmount}
          onChange={handleUsdChange}
          type="number"
          className="py-2 pl-4 text-sm text-gray-800 bg-gray-100 w-44 rounded-md focus:outline-none focus:appearance-none appearance-none rounded-full block"
          placeholder="Enter USD"
          autoComplete="off"
        ></input>

        <Dropdown
          placeholder="Choose Period"
          options={timeOptions}
          onChange={handleTimePeriodChange}
        ></Dropdown>
      </div>

      <div className="flex flex-wrap w-full gap-y-10 gap-x-10">
        {pools.map((pool, index) => (
          <PoolCard key={index} details={pool}></PoolCard>
        ))}
      </div>

      {/* <SearchBar></SearchBar> */}
    </div>
  );
};
export default Pooling;
