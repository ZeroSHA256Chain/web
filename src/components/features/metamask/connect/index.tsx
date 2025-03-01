import { Alert, Button, IconButton } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Web3 } from "web3";

import { SMART_CONTRACT_ABI } from "@/blockchain/";
import { Icon } from "@/components/ui";
import { SECOND } from "@/constants";
import { formatETHAddress } from "@/helpers";
import { useCopyAddress } from "@/hooks";
import { AuctionService } from "@/services";
import {
  auctionServiceAtom,
  connectedAccountAtom,
  web3Atom,
} from "@/store/atoms";

import { removeRequestAccountsDialog, requestEthereumAccounts } from "./utils";

export const ConnectMetamask = () => {
  const [web3, setWeb3] = useAtom(web3Atom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const setService = useSetAtom(auctionServiceAtom);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  const copyAddress = useCopyAddress();

  // to avoid flickering when loading
  const setLoadingWithMinDuration = useCallback(async (loading: boolean) => {
    const MIN_LOADING_TIME = 1 * SECOND;

    if (loading) {
      setIsLoading(true);
    } else {
      const startTime = Date.now();
      const timeElapsed = Date.now() - startTime;

      if (timeElapsed < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - timeElapsed)
        );
      }

      setIsLoading(false);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!web3) return;

    setError(null);

    await setLoadingWithMinDuration(true);

    try {
      await requestEthereumAccounts();

      removeRequestAccountsDialog();

      const allAccounts = await web3.eth.getAccounts();

      setConnectedAccount(allAccounts[0]);
    } catch (_error) {
      setError("Connection error");
    } finally {
      await setLoadingWithMinDuration(false);
    }
  }, [web3, setConnectedAccount, setLoadingWithMinDuration]);

  useEffect(
    function checkForMetaMaskInstallation() {
      const checkMetaMask = async () => {
        await setLoadingWithMinDuration(true);

        if (window.ethereum) {
          setIsMetaMaskInstalled(true);
          setWeb3(new Web3(window.ethereum));
        } else {
          setError("Please install MetaMask to use this application");
        }

        await setLoadingWithMinDuration(false);
      };

      checkMetaMask();
    },
    [setWeb3, setLoadingWithMinDuration]
  );

  useEffect(
    function initializeAuctionService() {
      if (connectedAccount) {
        setService(
          new AuctionService(
            import.meta.env.VITE_PROVIDER_URL,
            import.meta.env.VITE_SMART_CONTRACT_ADDRESS,
            SMART_CONTRACT_ABI,
            connectedAccount
          )
        );
      }
    },
    [connectedAccount, setService]
  );

  useEffect(
    function tryToConnectAutomatically() {
      if (isMetaMaskInstalled && !connectedAccount && !error) {
        connectWallet();
      }
    },
    [isMetaMaskInstalled, connectedAccount, error, connectWallet]
  );

  useEffect(
    // todo: review bahavior when account is reconected after error
    function clearErrorWhenAccountIsConnected() {
      if (connectedAccount && error) {
        setError(null);
      }
    },
    [connectedAccount, error]
  );

  if (error) {
    return (
      <Alert.Root
        status="error"
        w="fit-content"
        h={10}
        p={2}
        alignItems="center"
      >
        <Alert.Indicator />
        <Alert.Title>{error}</Alert.Title>

        <IconButton
          variant="ghost"
          colorPalette="black"
          onClick={connectWallet}
          color="white"
          size="sm"
        >
          <Icon name="RefreshCw" />
        </IconButton>
      </Alert.Root>
    );
  }

  return (
    <Button
      w={170}
      variant="solid"
      colorPalette="white"
      onClick={
        connectedAccount ? () => copyAddress(connectedAccount) : connectWallet
      }
      loading={isLoading}
      disabled={Boolean(error)}
    >
      {isLoading
        ? "Connecting..."
        : connectedAccount
          ? formatETHAddress(connectedAccount)
          : "Connect MetaMask"}
    </Button>
  );
};
