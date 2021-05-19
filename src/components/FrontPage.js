import Wallet from "@project-serum/sol-wallet-adapter";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import styled from "styled-components";

const ContainerCol = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
`;

const Header = styled.h1``;

const SubHeader = styled.h2`
  font-size: 20px;
  font-weight: 500;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;

const FeatureCard = styled.div`
  width: 200px;
  height: 200px;
  background-color: grey;
  border: 1px solid black;
`;

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
    <ContainerCol>
      <Header>DeFi Investing shouldn't be Rocket Science</Header>
      <SubHeader>DeFi is complicated, we make it simple</SubHeader>
      <CardsContainer>
        <FeatureCard></FeatureCard>
        <FeatureCard></FeatureCard>
        <FeatureCard></FeatureCard>
      </CardsContainer>
      <button onClick={handleConnect}>Connect Wallet</button>
      <div>{balance}</div>
      <div>{publicKey}</div>
    </ContainerCol>
  );
};

export default FrontPage;
