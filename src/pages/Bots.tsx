import { useEffect, useState } from "react";
import BotCard, { BotDetails } from "../components/BotCard";
import Dropdown, { DropdownOption } from "../components/Dropdown";
import SearchBar from "../components/SearchBar";

const Bots = () => {
  const [bots, setBots] = useState<BotDetails[]>([]);
  const [processedBots, setProcessedBots] = useState<BotDetails[]>([]);
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
    async function getFarms() {
      const response = await fetch("https://api.radardefi.com/bots");
      const json = await response.json();
      setBots(json);
    }

    getFarms();
  }, []);

  useEffect(() => {
    processFarms();
  }, [timePeriod, usdAmount, search, bots]);

  const handleUsdChange = (event: any) => {
    setUsdAmount(event.target.value);
  };

  const handleTimePeriodChange = (option: DropdownOption | undefined) => {
    setTimePeriod(option?.value);
  };

  const handleSearchChange = (search: string) => {
    setSearch(search);
  };

  const processFarms = () => {
    const prcoessedBots = bots
      .filter((bot) => search === "" || bot.market.includes(search))
      .map((bot) => {
        return {
          ...bot,
          totalYield:
            timePeriod && usdAmount
              ? calculateYield(timePeriod, usdAmount, bot)
              : undefined,
        };
      });

    setProcessedBots(prcoessedBots);
  };

  const calculateYield = (
    timePeriod: number,
    usdAmount: number,
    farm: BotDetails
  ): number => {
    return 0;
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
        <SearchBar
          placeHolder="Choose a farm"
          onChange={handleSearchChange}
        ></SearchBar>
      </div>

      <div className="flex flex-wrap w-full gap-y-10 gap-x-10">
        {processedBots.map((bot, index) => (
          <BotCard key={index} details={bot}></BotCard>
        ))}
      </div>
    </div>
  );
};
export default Bots;
