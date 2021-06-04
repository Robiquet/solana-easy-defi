import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const handleClick = () => {
    history.push(`bots/${details.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col rounded bg-light-green p-5 w-64 cursor-pointer"
    >
      <h3 className="text-2xl font-bold mb-3">{details.market}</h3>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Overall Returns</div>
        <div className="font-normal text-base text-center bg-black text-white font-bold py-1 px-2 rounded-full">
          {details.overall_return}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="font-normal text-base text-center">Max Drawdown</div>
        <div className="font-normal text-base text-center">
          {details.max_drawdown}
        </div>
      </div>
    </div>
  );
};
export default BotCard;
