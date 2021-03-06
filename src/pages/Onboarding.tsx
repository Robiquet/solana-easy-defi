import { useState } from "react";
import StartCard from "../components/StartCard";

const OnBoarding = () => {
  const options = [
    {
      title: "Liquidity",
      description: "Become a liquidity provider and earn a trading fee.",
      buttonText: "Find a Pool",
      buttonLink: "pooling",
      color: "light-red",
    },
    {
      title: "Stake",
      description: "Stake your asset for a risk free return.",
      buttonText: "Start Staking",
      buttonLink: "farming",
      color: "light-purple",
    },
    {
      title: "Automate",
      description: "Automate trading with battle-tested strategies.",
      buttonText: "Choose Bot",
      buttonLink: "bots",
      color: "light-green",
    },
  ];

  return (
    <div className="md:h-screen ml-4 mt-4 ">
      <h1 className="font-bold text-2xl mb-4">Seamless DeFi Investing</h1>
      <h2 className="font-semibold text-lg mb-6">
        We help you make better choices
      </h2>
      <div className="flex flex-wrap w-full h-full gap-10 ml-4">
        {options.map((option, index) => (
          <StartCard key={index} details={option}></StartCard>
        ))}
      </div>
    </div>
  );
};

export default OnBoarding;
