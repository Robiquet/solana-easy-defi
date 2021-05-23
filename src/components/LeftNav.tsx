import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
  return (
    <ul className="border border-gray-300 border-solid pr-10">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/onboarding">Onboarding</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/staking">Staking</Link>
      </li>
    </ul>
  );
};

export default LeftNav;
