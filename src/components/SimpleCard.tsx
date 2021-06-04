export interface SimpleCardConfig {
  header: string;
  info: string;
}

const SimpleCard = ({ details }: { details: SimpleCardConfig }) => {
  return (
    <div className="flex flex-col rounded bg-light-green p-5 w-80 cursor-pointer">
      <h4 className="text-4xl font-bold mb-6">Header</h4>
      <div className="text-6xl font-black">Content</div>
    </div>
  );
};
export default SimpleCard;
