import { Alert, Show } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

import { connectedAccountAtom } from "@/store/atoms";

const Index: React.FC = () => {
  const connectedAccount = useAtomValue(connectedAccountAtom);

  return (
    <Show
      when={Boolean(connectedAccount)}
      fallback={
        <Alert.Root status="info">
          <Alert.Indicator />

          <Alert.Title w="100%">Connect your web3 account</Alert.Title>
        </Alert.Root>
      }
    >
      Our content is here!
    </Show>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
