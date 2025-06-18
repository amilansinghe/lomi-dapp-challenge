import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import toast from "react-hot-toast"; // swap with 'react-toastify' if you prefer
import { NoMetamaskToast } from "../Components/CustomToasts";

// Import your contract/campaign managers here
import {
  createCampaign,
  getCampaignsDetail,
  getUserCampaigns,
} from "../Utils/CampaignManager";
import { getCampaignDetail } from "../Utils/CampaignContract";

// Create and export the MainContext
export const MainContext = createContext();

/**
 * MainProvider: Context Provider for global app state and Web3 functions
 */
export const MainProvider = ({ children }) => {
  const [account, setAccount] = useState(""); // Connected wallet address

  /**
   * connectMetamaskWithAccount: Initiates MetaMask connection and updates account state
   */
  const connectMetamaskWithAccount = async () => {
    // 1. Detect MetaMask/Ethereum provider
    if (typeof window.ethereum === "undefined") {
      toast.custom(<NoMetamaskToast />, { duration: 7000 });
      return;
    }
    try {
      // 2. Create provider and request account connection
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // 3. Set state and notify user
      setAccount(address);
      toast.success("Wallet connected!", { duration: 7000 });
    } catch (error) {
      // 4. Handle MetaMask user rejection or other errors
      if (error.code === 4001) {
        toast("Connection request rejected.", { icon: "⚠️" });
      } else {
        toast.error("Error connecting to MetaMask: " + error.message);
      }
    }
  };

  /**
   * checkIfWalletIsConnect: Checks if wallet is already connected (on mount)
   */
  useEffect(() => {
    const checkIfWalletIsConnect = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (e) {
          // Optional: toast.error("Wallet check failed: " + e.message);
        }
      }
    };
    checkIfWalletIsConnect();
  }, []);

  // --- Expose all your API/contract utilities in the context value ---
  return (
    <MainContext.Provider
      value={{
        account, // Current connected wallet address
        connectMetamaskWithAccount, // Function to connect MetaMask
        createCampaign,
        getCampaignsDetail,
        getCampaignDetail,
        getUserCampaigns,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Pro Notes:
 * - This context auto-checks wallet connection on page load.
 * - Uses react-hot-toast for clean, non-blocking notifications.
 * - Handles all MetaMask edge cases (no wallet, rejection, error).
 * - Provider pattern makes wallet/account info available app-wide.
 * - Easy to extend with more global Web3 or UI logic as needed.
 */
