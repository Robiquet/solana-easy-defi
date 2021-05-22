import Wallet from "@project-serum/sol-wallet-adapter"; //does seem to support ts
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import FeatureCard from "../components/FeatureCard";


const Home = () => {
  const [balance, setBalance] = useState();
  const [publicKey, setPublicKey] = useState();

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
  };

  return (
    <div className="flex flex-col md:h-screen justify-around items-center flex-grow">
      <h1 className="font-bold text-2xl">DeFi Investing shouldn't be Rocket Science</h1>
      <h2 className="font-semibold text-lg">DeFi is complicated, we make it simple</h2>
      <div className="flex flex-wrap justify-evenly w-screen">
        <FeatureCard>Get an overview of rates</FeatureCard>
        <FeatureCard>Stake your assets in one click</FeatureCard>
        <FeatureCard>Automate your trading with bots</FeatureCard>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-52" onClick={handleConnect}>Connect Wallet</button>
      <div>{balance}</div>
      <div>{publicKey}</div>
    </div>
  );
};

export default Home;
