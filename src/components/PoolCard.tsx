import { useHistory } from "react-router-dom";
import { formatCurrency } from "../utils/format-currency";
import { formatPercentage } from "../utils/format-percentage";

export interface PoolDetails {
  apy: number;
  fees: number;
  id: string;
  tokenA: string;
  tokenB: string;
  volume: number;
  reserves: number;
  totalYield?: number;
}

const PoolCard = ({ details }: { details: PoolDetails }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`pooling/${details.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col rounded bg-light-green p-5 cursor-pointer w-64 "
    >
      <h3 className="text-lg font-bold mb-3 uppercase">
        {details?.tokenA} - {details?.tokenB}
      </h3>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Total Yield</div>
        <div className="font-normal text-base text-center bg-black text-white font-bold py-1 px-2 rounded-full">
          {details?.totalYield ? formatCurrency(details.totalYield) : "?"}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">APY</div>
        <div className="font-normal text-base text-center">
          {formatPercentage(details?.apy)}
        </div>
      </div>
      {/* <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Fees</div>
        <div className="font-normal text-base text-center">{details?.fees}</div>
      </div> */}
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Volume</div>
        <div className="font-normal text-base text-center">
          {formatCurrency(details?.volume)}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Reserves</div>
        <div className="font-normal text-base text-center">
          {formatCurrency(details?.reserves)}
        </div>
      </div>
    </div>
  );
};
export default PoolCard;
