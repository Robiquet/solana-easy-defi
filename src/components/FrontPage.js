import Wallet from "@project-serum/sol-wallet-adapter";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";

const FrontPage = () => {
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
    <>
      <button onClick={handleConnect}>Connect Wallet</button>
      <div>{balance}</div>
      <div>{publicKey}</div>
    </>
  );
};

export default FrontPage;
