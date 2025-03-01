import {
  Box,
  HStack,
  Heading,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { memo } from "react";

import { AddressButton, AuctionStatusBadge } from "@/components/features";
import { LoadedContentController } from "@/components/utils";
import { ETHEREUM_TOKEN } from "@/constants";
import { gweiToETH } from "@/helpers";
import { useAuctionFetch } from "@/hooks";
import { Auction } from "@/services";

import { AssetDetails, BidHistory } from "./components";

interface AuctionDetailsProps {
  id: number;
}

export const AuctionDetails: React.FC<AuctionDetailsProps> = memo(({ id }) => {
  const {
    data: auction,
    isLoading,
    isError,
    isFetched,
  } = useAuctionFetch<Auction>({
    method: "_getMockAuction",
    args: { id },
  });

  return (
    <LoadedContentController
      isLoading={isLoading}
      isError={isError}
      isEmpty={isFetched && !auction}
      errorMessage="Failed to fetch auction. Please try again."
      data={auction}
    >
      {(auction) => (
        <Box borderRadius="lg" p={6} boxShadow="xl" w="full">
          <VStack align="start" spaceY={6}>
            <HStack justify="space-between" w="full">
              <VStack align="start" spaceY={1}>
                <Heading as="h2" fontSize="2xl" fontWeight="bold">
                  {auction.name}
                </Heading>

                <HStack spaceX={2}>
                  <Text color="gray.500">Created by </Text>

                  <AddressButton address={auction.creator} />
                </HStack>
              </VStack>

              <AuctionStatusBadge status={auction.status} />
            </HStack>

            <Separator />

            <HStack justify="space-between" w="full">
              <VStack align="start" spaceY={2}>
                <Text>
                  Start Price: {gweiToETH(Number(auction.startPrice))}{" "}
                  {ETHEREUM_TOKEN}
                </Text>

                <Text>
                  Current Bid: {gweiToETH(Number(auction.bestBid.price))}{" "}
                  {ETHEREUM_TOKEN}
                </Text>

                <Text>
                  Minimum Step: {gweiToETH(Number(auction.bidStep))}{" "}
                  {ETHEREUM_TOKEN}
                </Text>
              </VStack>

              <VStack align="end" spaceY={2}>
                <Text>
                  Ends:{" "}
                  {formatDistance(Number(auction.endTime), Date.now(), {
                    addSuffix: true,
                  })}
                </Text>

                <HStack spaceX={2}>
                  <Text>Arbiter: </Text>

                  <AddressButton address={auction.creator} />
                </HStack>
              </VStack>
            </HStack>

            <Separator />

            <AssetDetails asset={auction.asset} />

            <Separator />

            <BidHistory
              bestBid={auction.bestBid}
              bidsCount={auction.bidsCount}
              id={id}
            />
          </VStack>
        </Box>
      )}
    </LoadedContentController>
  );
});
