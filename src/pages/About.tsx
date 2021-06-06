import PersonCard, { Person } from "../components/PersonCard";

const people: Person[] = [
  {
    name: "Tom Robiquet",
    link: "https://github.com/robiquet",
    photoURL: "https://avatars.githubusercontent.com/u/4950844?v=4",
  },
  {
    name: "Bapi Reddy",
    link: "https://github.com/Bapi-Reddy",
    photoURL: "https://avatars.githubusercontent.com/u/9352749?v=4",
  },
];

const About = () => {
  return (
    <div>
      <div className="font-bold text-2xl m-4">The Team</div>
      <div className="flex flex-wrap">
        {people.map((person, index) => (
          <PersonCard person={person} key={index} />
        ))}
      </div>
    </div>
  );
};

export default About;
