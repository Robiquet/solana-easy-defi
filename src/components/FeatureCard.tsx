const FeatureCard = (props: {
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div
      className={
        "flex flex-col items-center justify-between	max-w-xs max-h-56 w-full h-full rounded p-5 bg-" +
        props.color
      }
    >
      <h3 className="text-4xl font-extrabold mb-6">{props.title}</h3>
      <p className="font-normal text-base text-center	">{props.description}</p>
    </div>
  );
};

export default FeatureCard;
