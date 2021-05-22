export interface PoolDetails {
  apy: number;
  fees: number;
  id: number;
  tokenA: string;
  tokenB: string;
  volume: number;
}

const PoolCard = ({details}: { details: PoolDetails }) => {
  return (
    <div className="flex flex-col  rounded bg-green-200 p-5">
      <h3 className="text-2xl font-bold mb-3">
        {details?.tokenA} - {details?.tokenB}
      </h3>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Total Yield</div>
        <div className="font-normal text-base text-center bg-black text-white font-bold py-1 px-2 rounded-full">TBC</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">APY</div>
        <div className="font-normal text-base text-center">{details?.apy}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Fees</div>
        <div className="font-normal text-base text-center">{details?.fees}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Volume</div>
        <div className="font-normal text-base text-center">{details?.volume}</div>
      </div>
    </div>
  );
};
export default PoolCard;
