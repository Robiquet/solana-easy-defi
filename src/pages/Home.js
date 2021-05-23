import Wallet from "@project-serum/sol-wallet-adapter"; //does seem to support ts
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import FeatureCard from "../components/FeatureCard";
import { useHistory } from "react-router-dom";


const Home = () => {
  const [balance, setBalance] = useState();
  const [publicKey, setPublicKey] = useState();
  const history = useHistory();


  const features = [
    {
      title: "Liquidity",
      description:
        "Get an overview of APR on all the liquidity pools. Including historical average and future projections.",
    },
    {
      title: "Stake",
      description:
        "Stake your assets in one click and never let your assets sit idle in your account. No one likes freeloaders.",
    },
    {
      title: "Automate",
      description:
        "Onchain strategies to automate your trading. Let Bots do the trading.",
    },
  ];

  const handleConnect = async () => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const providerUrl = "https://www.sollet.io";
    const wallet = new Wallet(providerUrl);
    wallet.on("connect", async (publicKey) => {
      console.log("Connected to " + publicKey.toBase58());
    });
    wallet.on("disconnect", () => console.log("Disconnected"));
    await wallet.connect();
    const balance = await connection.getBalance(wallet.publicKey);
    setBalance(balance);
    setPublicKey(wallet.publicKey.toBase58());
    const tokenaddress = new PublicKey(
      "8KDdfccDqh1yrShSLqdVUyukt8mX5r6HEEPWUUFosEHF"
    );
    console.log(await connection.getTokenAccountBalance(tokenaddress));
    history.push('/onboarding');

  };

  return (
    <div className="flex flex-col md:h-screen justify-around ml-4 flex-grow">
      <h1 className="font-bold text-2xl">
        DeFi Investing shouldn't be Rocket Science
      </h1>
      <h2 className="font-semibold text-lg">
        DeFi is complicated, we make it simple
      </h2>
      <div className="flex flex-wrap justify-evenly w-full">
        {features.map(feature => <FeatureCard title={feature.title} description={feature.description}></FeatureCard>)}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-52"
        onClick={handleConnect}
      >
        Connect Wallet
      </button>
      <div>{balance}</div>
      <div>{publicKey}</div>
    </div>
  );
};

export default Home;
