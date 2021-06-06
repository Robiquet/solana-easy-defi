export interface Person {
  name: string;
  link: string;
  photoURL: string;
}

const PersonCard = ({ person }: { person: Person }) => {
  const handleClick = () => {
    window.location.href = person.link;
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center w-48 bg-blue-100 p-4 rounded m-6 cursor-pointer"
    >
      <img
        src={person.photoURL}
        alt="Avatar"
        className="h-32 w-32 bg-blue-600 rounded-full"
      ></img>
      <div className="text-lg font-semibold my-4">{person.name}</div>
    </div>
  );
};
export default PersonCard;
