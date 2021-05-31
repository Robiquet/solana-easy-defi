import { useEffect, useState } from "react";
import BotCard, { BotDetails } from "../components/BotCard";
import SearchBar from "../components/SearchBar";

const Bots = () => {
  const [bots, setBots] = useState<BotDetails[]>([]);
  const [processedBots, setProcessedBots] = useState<BotDetails[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function getBots() {
      const response = await fetch("https://api.radardefi.com/bots");
      const json = await response.json();
      setBots(json);
    }

    getBots();
  }, []);

  useEffect(() => {
    processBots();
  }, [search, bots]);

  const handleSearchChange = (search: string) => {
    setSearch(search);
  };

  const processBots = () => {
    const prcoessedBots = bots.filter(
      (bot) =>
        search === "" || bot.market.toUpperCase().includes(search.toUpperCase())
    );

    setProcessedBots(prcoessedBots);
  };

  return (
    <div className="flex flex-col md:h-screen ml-4 flex-grow mt-4 ">
      <div className="font-bold text-2xl mb-4">Choose a Bot</div>
      <div className="flex space-x-5 mb-5">
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
