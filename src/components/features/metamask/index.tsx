import { Alert, Button, Presence, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Web3 } from "web3";

import ProjectManagementHome from "./ProjectManagementHome";

export const ConnectMetamask = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [providerMessage, setProvider] = useState<string | null>(null);
  const [accountButtonDisabled, setAccountButtonDisabled] =
    useState<boolean>(false);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

  useEffect(() => {
    // ensure that there is an injected the Ethereum provider
    if (window.ethereum) {
      // use the injected Ethereum provider to initialize Web3.js
      setWeb3(new Web3(window.ethereum));
      // check if Ethereum provider comes from MetaMask
      if (window.ethereum.isMetaMask) {
        setProvider("MetaMask installed");
      } else {
        setProvider("Non-MetaMask provider detected.");
      }
    } else {
      // no Ethereum provider - instruct user to install MetaMask
      setWarning("Please install MetaMask");
      setAccountButtonDisabled(true);
    }
  }, []);

  useEffect(() => {
    requestAccounts();
  }, [web3]);

  // click event for "Request MetaMask Accounts" button
  async function requestAccounts() {
    if (web3 === null) {
      return;
    }
    console.log("Requesting MetaMask accounts...");
    // request accounts from MetaMask
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("requestAccounts")?.remove();

    // get list of accounts
    const allAccounts = await web3.eth.getAccounts();
    // get the first account and populate placeholder
    setConnectedAccount(allAccounts[0]);
  }

  return (
    <VStack
      bg="white"
      border="2px solid"
      borderColor="gray.600"
      p={4}
      borderRadius="md"
      spaceY={4}
      maxW={1000}
    >
      <VStack spaceY={2} align="start">
        <Presence present={Boolean(warning)}>
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{warning}</Alert.Title>
          </Alert.Root>
        </Presence>

        <Presence present={Boolean(providerMessage)}>
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Title>{providerMessage}</Alert.Title>
          </Alert.Root>
        </Presence>

        <Presence present={Boolean(connectedAccount)}>
          <Alert.Root status="info">
            <Alert.Title>Account: {connectedAccount}</Alert.Title>
          </Alert.Root>
        </Presence>
      </VStack>

      {!connectedAccount ? (
        <Button
          variant="solid"
          colorPalette="pink"
          onClick={() => requestAccounts()}
          disabled={accountButtonDisabled}
        >
          Connect MetaMask
        </Button>
      ) : null}

      {web3 && connectedAccount ? (
        <ProjectManagementHome
          web3={web3}
          connectedAccount={connectedAccount}
        />
      ) : null}
    </VStack>
  );
};
