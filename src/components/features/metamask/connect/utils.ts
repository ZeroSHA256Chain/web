export const requestEthereumAccounts = async () =>
  await window.ethereum.request({ method: "eth_requestAccounts" });

export const removeRequestAccountsDialog = () => {
  document.getElementById("requestAccounts")?.remove();
};
