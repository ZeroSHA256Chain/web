import { Alert, Box, Show } from "@chakra-ui/react";
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

          <Alert.Title w="100%">
            Connect your account to view content!
          </Alert.Title>
        </Alert.Root>
      }
    >
      <Box bg="black" color="white" p={4}>
        Our content is here!
      </Box>
    </Show>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
