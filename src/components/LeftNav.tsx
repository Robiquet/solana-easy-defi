import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
  return (
    <ul >
      <li>
        <Link to="/">Home</Link>
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
