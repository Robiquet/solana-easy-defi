import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
  const links = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/onboarding",
      text: "Onboarding",
    },
    {
      to: "/dashboard",
      text: "Dashboard",
    },
    {
      to: "/staking",
      text: "Staking",
    },
  ];

  return (
    <ul className="border-r-2 border-gray-300 border-solid pr-10 pl-4 pt-4 border-opacity-50">
      {links.map((link, index) => (
        <li key={index} className="pb-2 font-semibold">
          <Link to={link.to}>{link.text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default LeftNav;
