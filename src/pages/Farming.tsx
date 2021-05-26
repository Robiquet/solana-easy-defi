import { useEffect, useState } from "react";
import Dropdown, { DropdownOption } from "../components/Dropdown";
import FarmCard, { FarmDetails } from "../components/FarmCard";

const Farming = () => {
  const [farms, setFarms] = useState<FarmDetails[]>([]);
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
      const response = await fetch("https://api.radardefi.com/farms");
      const json = await response.json();
      setFarms(json);
    }

    checkConnection();
  }, []);

  useEffect(() => {
    recalulateFarmReturns();
  }, [timePeriod, usdAmount]);

  const handleUsdChange = (event: any) => {
    setUsdAmount(event.target.value);
  };

  const handleTimePeriodChange = (option: DropdownOption | undefined) => {
    setTimePeriod(option?.value);
  };

  const recalulateFarmReturns = () => {
    const newPools = farms.map((farm) => {
      return {
        ...farm,
        totalYield:
          timePeriod && usdAmount
            ? calculateYield(timePeriod, usdAmount, farm)
            : undefined,
      };
    });

    setFarms(newPools);
  };

  const calculateYield = (
    timePeriod: number,
    usdAmount: number,
    farm: FarmDetails
  ): number => {
    return Math.round(timePeriod * usdAmount * farm.total_apr * 0.01);
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
        {farms.map((farm, index) => (
          <FarmCard key={index} details={farm}></FarmCard>
        ))}
      </div>

      {/* <SearchBar></SearchBar> */}
    </div>
  );
};
export default Farming;
