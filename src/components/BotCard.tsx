import { formatPercentage } from "../utils/format-percentage";

export interface BotDetails {
  id: number;
  bonfida_pool_link: string;
  bot_name: string;
  market: string;
  max_drawdown: number;
  overall_return: number;
  safu: number;
  sharpe: number;
}

const BotCard = ({ details }: { details: BotDetails }) => {
  const handleClick = () => {
    window.location.href = details.bonfida_pool_link;
  };
  return (
    <div className="flex flex-col rounded bg-light-green p-5 w-64">
      <h3 className="text-2xl font-bold mb-3 capitalize">{details.bot_name}</h3>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Market</div>
        <div className="font-normal text-base text-center">
          {details.market}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Max Drawdown</div>
        <div className="font-normal text-base text-center">
          {formatPercentage(details.max_drawdown)}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Overall Return</div>
        <div className="font-normal text-base text-center">
          {formatPercentage(details.overall_return)}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">SAFU factor</div>
        <div className="font-normal text-base text-center">{details.safu}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Sharpe Ratio</div>
        <div className="font-normal text-base text-center">
          {details.sharpe}
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <button
          className="bg-cyan hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-32"
          onClick={handleClick}
        >
          Invest
        </button>
      </div>
    </div>
  );
};
export default BotCard;
