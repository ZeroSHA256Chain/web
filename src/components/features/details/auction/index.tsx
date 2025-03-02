import { Grid, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";

import {
  AddressButton,
  AssetDetails,
  AuctionStatusBadge,
  AuctionTimeBadge,
  BidsHistory,
  BidsOverviewTable,
} from "@/components/features";
import { MakeBidForm } from "@/components/features";
import { LoadedContentController } from "@/components/utils";
import { useAuctionFetch } from "@/hooks";
import { Auction } from "@/services";

interface AuctionDetailsProps {
  id: number;
}

const BLOCK_HEIGHT = 220;

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
        <VStack align="start" spaceY={6} maxW="full" p={4}>
          <VStack align="start" spaceY={2} w="full">
            <Grid
              templateColumns={{
                base: "1fr",
                md: "1fr 1fr",
              }}
              gap={4}
              w="full"
              justifyItems="space-between"
            >
              <VStack
                align="start"
                spaceY={{
                  base: 0,
                  md: 2,
                }}
              >
                <Heading
                  as="h2"
                  fontSize={{
                    base: "lg",
                    md: "2xl",
                  }}
                  fontWeight="bold"
                >
                  {auction.name}
                </Heading>

                <HStack>
                  <Text color="fg.muted">Created by </Text>

                  <AddressButton address={auction.creator} />
                </HStack>
              </VStack>

              <Grid
                templateColumns={{
                  base: "1fr 1fr",
                  md: "1fr",
                }}
                alignSelf="start"
                justifySelf={{
                  base: "start",
                  md: "end",
                }}
                justifyItems={{
                  base: "start",
                  md: "end",
                }}
                gap={2}
                spaceY={{
                  base: 0,
                  md: 2,
                }}
                w="fit-content"
              >
                <AuctionTimeBadge endTime={Number(auction.endTime)} />

                <AuctionStatusBadge w="fit-content" status={auction.status} />
              </Grid>
            </Grid>

            <Grid
              templateColumns={{
                base: "1fr",
                md: "1fr 1fr",
              }}
              gap={2}
              w="full"
            >
              <VStack
                h={BLOCK_HEIGHT}
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

                <MakeBidForm auctionId={id} w="full" />
              </VStack>

              <AssetDetails
                h={BLOCK_HEIGHT}
                asset={auction.asset}
                border="1px solid"
                borderColor="border.muted"
                p={4}
                borderRadius="md"
              />
            </Grid>
          </VStack>

          <BidsHistory
            bestBid={auction.bestBid}
            bidsCount={auction.bidsCount}
            auctionId={id}
          />
        </VStack>
      )}
    </LoadedContentController>
  );
});
