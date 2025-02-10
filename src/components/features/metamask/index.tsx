import { Alert, Button, Input, Presence, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Web3 } from "web3";

import { SmartContractRepository } from "@/blockchain/SmartContractRepository";
import abi from "@/blockchain/abi.json";

export const ConnectMetamask = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [accountButtonDisabled, setAccountButtonDisabled] =
    useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [messageToSign, setMessageToSign] = useState<string | null>(null);
  const [signingResult, setSigningResult] = useState<string | null>(null);
  const [originalMessage, setOriginalMessage] = useState<string | null>(null);
  const [signedMessage, setSignedMessage] = useState<string | null>(null);
  const [signingAccount, setSigningAccount] = useState<string | null>(null);

  // unused
  const [_chainId, setChainId] = useState<string | null>(null);
  const [_latestBlock, setLatestBlock] = useState<string | null>(null);

  useEffect(() => {
    // ensure that there is an injected the Ethereum provider
    if (window.ethereum) {
      // use the injected Ethereum provider to initialize Web3.js
      setWeb3(new Web3(window.ethereum));
      // check if Ethereum provider comes from MetaMask
      if (window.ethereum.isMetaMask) {
        setProvider("Connected to Ethereum with MetaMask.");
      } else {
        setProvider("Non-MetaMask Ethereum provider detected.");
      }
    } else {
      // no Ethereum provider - instruct user to install MetaMask
      setWarning("Please install MetaMask");
      setAccountButtonDisabled(true);
    }
  }, []);

  useEffect(() => {
    async function getChainId() {
      if (web3 === null) {
        return;
      }

      // get chain ID and populate placeholder
      setChainId(String(await web3.eth.getChainId()));
    }

    async function getLatestBlock() {
      if (web3 === null) {
        return;
      }

      // get latest block and populate placeholder
      setLatestBlock(`Latest Block: ${await web3.eth.getBlockNumber()}`);

      // subscribe to new blocks and update UI when a new block is created
      const blockSubscription = await web3.eth.subscribe("newBlockHeaders");
      blockSubscription.on("data", (block) => {
        setLatestBlock(String(block.number));
      });
    }

    getChainId();
    getLatestBlock();
  }, [web3]);

  // click event for "Request MetaMask Accounts" button
  async function requestAccounts() {
    if (web3 === null) {
      return;
    }

    // request accounts from MetaMask
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("requestAccounts")?.remove();

    // get list of accounts
    const allAccounts = await web3.eth.getAccounts();
    setAccounts(allAccounts);
    // get the first account and populate placeholder
    setConnectedAccount(allAccounts[0]);
  }

  async function doThing() {
    const provider = "http://127.0.0.1:8545/";
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const userAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    const repo: SmartContractRepository = new SmartContractRepository(
      provider,
      contractAddress,
      abi,
      userAccount
    );

    await repo.createProject(
      "Project 1",
      "Description 1",
      1739789181,
      false,
      [],
      []
    );

    const project = await repo.getProject(0);
    console.log(project);
  }

  // click event for "Sign Message" button
  async function signMessage() {
    if (web3 === null || accounts === null || messageToSign === null) {
      return;
    }

    // sign message with first MetaMask account
    const signature = await web3.eth.personal.sign(
      messageToSign,
      accounts[0],
      ""
    );

    setSigningResult(signature);
  }

  // click event for "Recover Account" button
  async function recoverAccount() {
    if (web3 === null || originalMessage === null || signedMessage === null) {
      return;
    }
    // recover account from signature
    const account = await web3.eth.personal.ecRecover(
      originalMessage,
      signedMessage
    );

    console.log({ account });

    setSigningAccount(account);
  }
  return (
    <VStack
      bg="white"
      border="2px solid"
      borderColor="gray.600"
      p={4}
      borderRadius="md"
      spaceY={4}
      maxW={600}
    >
      <VStack spaceY={2} align="start">
        <Presence present={Boolean(warning)}>
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{warning}</Alert.Title>
          </Alert.Root>
        </Presence>

        <Presence present={Boolean(provider)}>
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Title>{provider}</Alert.Title>
          </Alert.Root>
        </Presence>

        <Presence present={Boolean(connectedAccount)}>
          <Alert.Root status="info">
            <Alert.Title>Account: {connectedAccount}</Alert.Title>
          </Alert.Root>
        </Presence>

        {/* not used */}
        {/* <Presence present={Boolean(chainId)}>
        <Alert.Root status="info">
          <Alert.Title>Chain ID: {chainId}</Alert.Title>
        </Alert.Root>
      </Presence>

      <Presence present={Boolean(latestBlock)}>
        <Alert.Root status="info">
          <Alert.Title>Latest Block: {latestBlock}</Alert.Title>
        </Alert.Root>
      </Presence> */}
      </VStack>

      <Button
        variant="solid"
        colorPalette="pink"
        onClick={() => requestAccounts()}
        disabled={accountButtonDisabled}
      >
        Request MetaMask Accounts
      </Button>

      <Button
        variant="solid"
        colorPalette="pink"
        onClick={() => doThing()}
        disabled={accountButtonDisabled}
      >
        Do thing
      </Button>

      <VStack spaceY={2}>
        <Input
          maxW={200}
          variant="subtle"
          onChange={(event) => {
            setMessageToSign(event.target.value);
          }}
          placeholder="Message to Sign"
          disabled={connectedAccount === null}
        />

        <Button
          variant="surface"
          colorPalette="pink"
          onClick={() => signMessage()}
          disabled={connectedAccount === null}
        >
          Sign Message
        </Button>

        <Text maxW={400} truncate>
          {signingResult}
        </Text>
      </VStack>

      <VStack spaceY={2}>
        <Input
          variant="subtle"
          onChange={(event) => {
            setOriginalMessage(event.target.value);
          }}
          placeholder="Original Message"
          disabled={connectedAccount === null}
        />

        <Input
          variant="subtle"
          onChange={(event) => {
            setSignedMessage(event.target.value);
          }}
          placeholder="Signed Message"
          disabled={connectedAccount === null}
        />

        <Button
          variant="subtle"
          colorPalette="pink"
          onClick={() => recoverAccount()}
          disabled={connectedAccount === null}
        >
          Recover Account
        </Button>

        <Text truncate>{signingAccount}</Text>
      </VStack>
    </VStack>
  );
};
