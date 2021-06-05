import PersonCard, { Person } from "../components/PersonCard";

const people: Person[] = [
  {
    name: "Tom Robiquet",
    link: "https://github.com/robiquet",
    photoURL: "https://avatars.githubusercontent.com/u/4950844?v=4",
  },
];

const About = () => {
  return (
    <div>
      <div className="font-bold text-2xl m-4">The Team</div>

      {people.map((person, index) => (
        <PersonCard person={person} key={index} />
      ))}
    </div>
  );
};

export default About;
