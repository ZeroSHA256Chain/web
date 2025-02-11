import { Alert, Button, Presence, VStack } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Web3 } from "web3";

import { SMART_CONTRACT_ABI } from "@/blockchain/";
import { SmartContractRepository } from "@/blockchain/repository";
import { SmartContractService } from "@/services";
import {
  connectedAccountAtom,
  smartContractServiceAtom,
  web3Atom,
} from "@/store/atoms";

import { removeRequestAccountsDialog, requestEthereumAccounts } from "./utils";

export const ConnectMetamask = () => {
  const [web3, setWeb3] = useAtom(web3Atom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const setService = useSetAtom(smartContractServiceAtom);

  const [warning, setWarning] = useState<string | null>(null);
  const [providerMessage, setProvider] = useState<string | null>(null);

  const requestAccounts = useCallback(async () => {
    if (!web3) return;

    setWarning(null);

    await requestEthereumAccounts();

    removeRequestAccountsDialog();

    const allAccounts = await web3.eth.getAccounts();

    // set the first account as the connected account
    setConnectedAccount(allAccounts[0]);
  }, [web3]);

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
    }
  }, []);

  useEffect(() => {
    if (connectedAccount) {
      const repository = new SmartContractRepository(
        import.meta.env.VITE_PROVIDER_URL,
        import.meta.env.VITE_SMART_CONTRACT_ADDRESS,
        SMART_CONTRACT_ABI,
        connectedAccount
      );

      const service = new SmartContractService(repository);

      setService(service);
    }
  }, [connectedAccount]);

  useEffect(() => {
    requestAccounts();
  }, [requestAccounts]);

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
          disabled={Boolean(warning)}
        >
          Connect MetaMask
        </Button>
      ) : null}
    </VStack>
  );
};
