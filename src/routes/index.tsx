import { VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import { ConnectMetamask } from "@/components/features";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <VStack as="main" spaceX={4} padding={4}>
      <ConnectMetamask />
    </VStack>
  );
}
