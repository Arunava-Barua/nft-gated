import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from 'axios';


/*
1. Marketplace NFTs
2. My NFTs -- Done
3. RentedNFTs
*/


export const NftGatedContext = React.createContext();

export const NftGatedProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [isValid, setIsValid] = useState(false);
  
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    console.log("Connect wallet");
    if (!window.ethereum) return alert("Please install MetaMask.");

    // Fetch all the eth accounts------------------------------------here----------------
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
  };

  useEffect(() => {
    try {
      checkIfWalletIsConnected();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const checkValidity = async (tokenId) => {
    const result = await axios(`https://dynarent-api.onrender.com/verify/${currentAccount}/${tokenId}`);
    console.log(result.data.verified);

    setIsValid(result.data.verified);
  }

  return (
    <NftGatedContext.Provider
      value={{
        connectWallet,
        currentAccount,
        loading,
        isValid,
        checkValidity
      }}
    >
      {children}
    </NftGatedContext.Provider>
  );
};
