import { Alert, Show } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

import { mockAuctions } from "@/__mocks__/auctions_list";
import { AuctionsTable } from "@/components/features";
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
      <AuctionsTable auctions={mockAuctions} />
    </Show>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
