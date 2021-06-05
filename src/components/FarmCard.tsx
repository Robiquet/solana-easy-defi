import { useHistory } from "react-router-dom";

export interface FarmDetails {
  id: string;
  tokenA: string;
  tokenB: string;
  liquidity: number;
  total_apr: number;
  totalYield?: number;
}

const FarmCard = ({ details }: { details: FarmDetails }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`farming/${details.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col rounded bg-light-green p-5 w-64 cursor-pointer"
    >
      <h3 className="text-2xl font-bold mb-3 uppercase">
        {details?.tokenA} - {details?.tokenB}
      </h3>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Total Yield</div>
        <div className="font-normal text-base text-center bg-black text-white font-bold py-1 px-2 rounded-full">
          ${details.totalYield}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">APR</div>
        <div className="font-normal text-base text-center">
          {details.total_apr}%
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Liquidity</div>
        <div className="font-normal text-base text-center">
          {details.liquidity}
        </div>
      </div>
    </div>
  );
};
export default FarmCard;
