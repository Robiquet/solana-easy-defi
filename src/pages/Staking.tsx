import { useEffect } from "react";
import { useState } from "react";
import PoolCard, { PoolDetails } from "../components/PoolCard";
import SearchBar from "../components/SearchBar";

const Staking = () => {
  const [pools, setPools] = useState<PoolDetails[]>([]);

  useEffect(() => {
    async function checkConnection() {
      const response = await fetch("http://13.234.67.237/pools");
      const json = await response.json();
      console.log(json);
      setPools(json);
    }

    checkConnection();
  }, []);

  return (
    <div className="flex flex-col md:h-screen ml-4 flex-grow">
      <div>Choose a Pool</div>
      <div className="flex flex-wrap w-full gap-y-10 gap-x-10">
        {pools.map((pool) => (
          <PoolCard details={pool}></PoolCard>
        ))}
      </div>

      {/* <SearchBar></SearchBar> */}
    </div>
  );
};
export default Staking;
