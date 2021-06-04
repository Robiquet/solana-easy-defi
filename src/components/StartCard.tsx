import { useHistory } from "react-router-dom";

interface StartCardDetails {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color: string;
}

const StartCard = ({ details }: { details: StartCardDetails }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(details.buttonLink);
  };

  return (
    <div
      className={
        "flex flex-col items-center justify-between	w-64 max-h-56  h-full rounded p-5 bg-" +
        details.color
      }
    >
      <h3 className="text-4xl font-extrabold mb-6">{details.title}</h3>
      <p className="font-normal text-base text-center	">{details.description}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-48"
        onClick={handleClick}
      >
        {details.buttonText}
      </button>
    </div>
  );
};
export default StartCard;
