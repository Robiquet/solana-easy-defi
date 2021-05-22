
const FeatureCard = (props: {title:string, description:string}) => {
  return (
    <div className="flex flex-col items-center justify-between	max-w-xs max-h-56 w-full h-full rounded bg-green-200 p-5 ">
      <h3 className="text-4xl font-extrabold mb-6">{props.title}</h3>
      <p className="font-normal text-base text-center	">{props.description}</p>
    </div>
  );
};

export default FeatureCard;
