import { Alert, Show } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

import { AuctionsTable } from "@/components/features";
import { LoadedContentController } from "@/components/utils";
import { useAuctionFetch } from "@/hooks";
import { Auction } from "@/services";
import { connectedAccountAtom } from "@/store/atoms";

const Home: React.FC = () => {
  const connectedAccount = useAtomValue(connectedAccountAtom);

  const {
    data: auctions,
    isLoading,
    isError,
    isFetched,
  } = useAuctionFetch<Auction[]>({
    method: "getAuctions",
  });

  return (
    <Show
      when={Boolean(connectedAccount)}
      fallback={
        <Alert.Root status="info" w="fit-content">
          <Alert.Indicator />

          <Alert.Title w="100%">
            Connect your account to view content!
          </Alert.Title>
        </Alert.Root>
      }
    >
      <LoadedContentController
        isLoading={isLoading}
        isError={isError}
        isEmpty={isFetched && !auctions?.length}
        errorMessage="Error fetching auctions. Please try again."
        emptyMessage="No auctions found"
        data={auctions}
      >
        {(data) => <AuctionsTable auctions={data} />}
      </LoadedContentController>
    </Show>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
