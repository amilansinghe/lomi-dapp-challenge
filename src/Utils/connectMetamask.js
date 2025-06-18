import { ethers } from "ethers";
import { toast } from "react-toastify";

// Connects to MetaMask and returns signer, provider, and address
export const connectMetamask = async () => {
  if (typeof window.ethereum === "undefined") {
    toast.error("No Metamask detected. Please install Metamask to continue.");
    return null;
  }
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { signer, provider, address };
  } catch (error) {
    if (error.code === 4001) {
      toast.warn("Connection request rejected.");
    } else {
      toast.error("Error connecting to MetaMask: " + error.message);
    }
    return null;
  }
};

// Checks if wallet is already connected and updates account state
export const checkIfWalletIsConnect = async (setAccount) => {
  if (typeof window.ethereum === "undefined") {
    return;
  }
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      // Optional: toast.info("No wallet connected.");
    }
  } catch (error) {
    toast.error("Wallet check failed: " + error.message);
  }
};
