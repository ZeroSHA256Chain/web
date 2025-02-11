import { Alert, Button, HStack, Show, VStack } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Web3 } from "web3";

import { SMART_CONTRACT_ABI } from "@/blockchain/";
import { SmartContractRepository } from "@/blockchain/repository";
import { toaster } from "@/components/ui";
import { SmartContractService } from "@/services";
import {
  connectedAccountAtom,
  smartContractServiceAtom,
  web3Atom,
} from "@/store/atoms";

import {
  formatEthereumAddress,
  removeRequestAccountsDialog,
  requestEthereumAccounts,
} from "./utils";

export const ConnectMetamask = () => {
  const [web3, setWeb3] = useAtom(web3Atom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const setService = useSetAtom(smartContractServiceAtom);

  const [warning, setWarning] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [attemptedToConnect, setAttemptedToConnect] = useState<boolean>(false);

  const requestAccounts = useCallback(async () => {
    if (!web3) return;

    setWarning(null);

    await requestEthereumAccounts();

    removeRequestAccountsDialog();

    const allAccounts = await web3.eth.getAccounts();

    // set the first account as the connected account
    setConnectedAccount(allAccounts[0]);
  }, [web3, setConnectedAccount]);

  useEffect(() => {
    // ensure that there is an injected the Ethereum provider
    if (window.ethereum) {
      // use the injected Ethereum provider to initialize Web3.js
      setWeb3(new Web3(window.ethereum));
      // check if Ethereum provider comes from MetaMask
      if (window.ethereum.isMetaMask) {
        setStatusMessage("MetaMask installed");
      } else {
        setStatusMessage("Non-MetaMask provider detected.");
      }
    } else {
      // no Ethereum provider - instruct user to install MetaMask
      setWarning("Please install MetaMask");
    }

    setAttemptedToConnect(true);
  }, [setWeb3]);

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
  }, [connectedAccount, setService]);

  useEffect(() => {
    requestAccounts();
  }, [requestAccounts]);

  return (
    <VStack>
      <HStack spaceX={2} align="center">
        <Show when={Boolean(warning)}>
          <Alert.Root status="error" minW={250}>
            <Alert.Indicator />
            <Alert.Title w="100%">{warning}</Alert.Title>
          </Alert.Root>
        </Show>

        <Show when={Boolean(statusMessage && !connectedAccount)}>
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Title>{statusMessage}</Alert.Title>
          </Alert.Root>
        </Show>

        <Show when={Boolean(connectedAccount)}>
          <Button
            variant="subtle"
            colorPalette="pink"
            onClick={async () => {
              if (!connectedAccount) return;

              await navigator.clipboard.writeText(connectedAccount);

              toaster.create({
                title: "Copied to clipboard",
                description: "Ethereum address copied to clipboard",
                type: "success",
              });
            }}
          >
            {connectedAccount ? formatEthereumAddress(connectedAccount) : ""}
          </Button>
        </Show>
      </HStack>

      <Show when={!connectedAccount && attemptedToConnect}>
        <Button
          variant="solid"
          colorPalette="red"
          onClick={() => requestAccounts()}
          disabled={Boolean(warning)}
        >
          Connect MetaMask
        </Button>
      </Show>
    </VStack>
  );
};
