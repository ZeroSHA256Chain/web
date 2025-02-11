export const requestEthereumAccounts = async () =>
  await window.ethereum.request({ method: "eth_requestAccounts" });

export const removeRequestAccountsDialog = () => {
  document.getElementById("requestAccounts")?.remove();
};

export const formatEthereumAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
