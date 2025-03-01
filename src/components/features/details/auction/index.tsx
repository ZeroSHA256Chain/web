import {
  Badge,
  HStack,
  Heading,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { memo } from "react";

import {
  AddressButton,
  AssetDetails,
  AuctionStatusBadge,
  BidsHistory,
  BidsOverviewTable,
} from "@/components/features";
import { Icon } from "@/components/ui";
import { LoadedContentController } from "@/components/utils";
import { useAuctionFetch } from "@/hooks";
import { Auction } from "@/services";

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
        <VStack align="start" spaceY={6}>
          <HStack spaceX={2} w="full" justify="space-between">
            <VStack align="start" spaceY={2}>
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                {auction.name}
              </Heading>

              <HStack>
                <Text color="fg.muted">Created by </Text>

                <AddressButton address={auction.creator} />
              </HStack>
            </VStack>

            <VStack align="end" spaceY={2}>
              <Badge size="md" variant="solid" colorPalette="black">
                <Icon height="1rem" width="1rem" name="CalendarClock" />

                <Text as="span">
                  {Number(auction.endTime) > Date.now() ? "Ends " : "Ended "}
                  {formatDistance(Number(auction.endTime), Date.now(), {
                    addSuffix: true,
                  })}
                </Text>
              </Badge>

              <AuctionStatusBadge status={auction.status} />
            </VStack>
          </HStack>

          <Separator w="full" />

          <HStack justify="space-between" w="full">
            <VStack
              align="start"
              w="full"
              border="1px solid"
              borderColor="border.muted"
              p={4}
              borderRadius="md"
            >
              <BidsOverviewTable
                bestBid={Number(auction.bestBid.price)}
                bidStep={Number(auction.bidStep)}
                minBid={Number(auction.startPrice)}
              />

              <VStack align="end" spaceY={2}>
                <HStack>
                  <Text color="fg.muted">Arbiter</Text>

                  <AddressButton address={auction.creator} />
                </HStack>
              </VStack>
            </VStack>

            <AssetDetails
              asset={auction.asset}
              border="1px solid"
              borderColor="border.muted"
              p={4}
              borderRadius="md"
            />
          </HStack>

          <Separator w="full" />

          <BidsHistory
            bestBid={auction.bestBid}
            bidsCount={auction.bidsCount}
            id={id}
          />
        </VStack>
      )}
    </LoadedContentController>
  );
});
