import { useEffect, useState } from "react";
import Dropdown, { DropdownOption } from "../components/Dropdown";
import PoolCard, { PoolDetails } from "../components/PoolCard";
import SearchBar from "../components/SearchBar";

const Pooling = () => {
  const [pools, setPools] = useState<PoolDetails[]>([]);
  const [processedPools, setProcessedPools] = useState<PoolDetails[]>([]);
  const [usdAmount, setUsdAmount] = useState<number>();
  const [timePeriod, setTimePeriod] = useState<number>();
  const [search, setSearch] = useState<string>("");

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
    async function getPools() {
      const response = await fetch("https://api.radardefi.com/pools");
      const json = await response.json();
      setPools(json);
    }
    getPools();
  }, []);

  useEffect(() => {
    processPools();
  }, [timePeriod, usdAmount, search, pools]);

  const handleUsdChange = (event: any) => {
    setUsdAmount(event.target.value);
  };

  const handleTimePeriodChange = (option: DropdownOption | undefined) => {
    setTimePeriod(option?.value);
  };

  const handleSearchChange = (search: string) => {
    setSearch(search);
  };

  const processPools = () => {
    const newPools = pools
      .filter(
        (pool) =>
          search === "" ||
          pool.tokenA?.toUpperCase().includes(search.toUpperCase()) ||
          pool.tokenB?.toUpperCase().includes(search.toUpperCase())
      )
      .map((pool) => {
        return {
          ...pool,
          totalYield:
            timePeriod && usdAmount
              ? calculateYield(timePeriod, usdAmount, pool)
              : undefined,
        };
      });
    setProcessedPools(newPools);
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
          min="0"
          className="py-2 pl-4 text-sm text-gray-800 bg-gray-100 w-44 rounded-md focus:outline-none focus:appearance-none appearance-none rounded-full block"
          placeholder="Enter USD"
          autoComplete="off"
        ></input>
        <Dropdown
          placeholder="Choose Period"
          options={timeOptions}
          onChange={handleTimePeriodChange}
        ></Dropdown>
        <SearchBar
          placeHolder="Search a pool"
          onChange={handleSearchChange}
        ></SearchBar>
      </div>

      <div className="flex flex-wrap w-full gap-y-10 gap-x-10">
        {processedPools.map((pool, index) => (
          <PoolCard key={index} details={pool}></PoolCard>
        ))}
      </div>
    </div>
  );
};
export default Pooling;
