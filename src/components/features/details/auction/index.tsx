import { Grid, Heading, VStack } from "@chakra-ui/react";
import { memo, useMemo } from "react";

import { mockAuction } from "@/__mocks__/auction";
import {
  AssetDetails,
  AuctionStatusBadge,
  AuctionTimeBadge,
  BidsHistory,
  BidsOverviewTable,
  RequestWithdrawnButton,
} from "@/components/features";
import { MakeBidForm } from "@/components/features";
import { LoadedContentController } from "@/components/utils";
import { useAuctionFetch } from "@/hooks";
import { Auction } from "@/services";

interface AuctionDetailsProps {
  id: number;
}

const BLOCK_HEIGHT = 170;

export const AuctionDetails: React.FC<AuctionDetailsProps> = memo(({ id }) => {
  const {
    data: auction = mockAuction,
    isLoading,
    isError,
    isFetched,
  } = useAuctionFetch<Auction>({
    method: "getAuction",
    args: { id },
  });

  const isEnded = useMemo(
    () => (auction ? auction.endTime < Date.now() : false),
    [auction]
  );

  return (
    <LoadedContentController
      isLoading={isLoading}
      isError={isError}
      isEmpty={isFetched && !auction}
      errorMessage="Failed to fetch auction. Please try again."
      emptyMessage="No auction found"
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
                  {auction.title}
                </Heading>

                <AuctionStatusBadge w="fit-content" status={auction.status} />
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
                <RequestWithdrawnButton disabled={isEnded} auctionId={id} />

                <AuctionTimeBadge
                  endTime={Number(auction.endTime)}
                  isEnded={isEnded}
                />
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
                  bestBid={auction.bestBid?.price || 0}
                  bidStep={auction.bidStep}
                />

                <MakeBidForm auctionId={id} w="full" />
              </VStack>

              <AssetDetails
                creator={auction.creator}
                h={BLOCK_HEIGHT}
                asset={auction.asset}
                border="1px solid"
                borderColor="border.muted"
                p={4}
                borderRadius="md"
              />
            </Grid>
          </VStack>

          <BidsHistory bidsCount={auction.bidsCount} auctionId={id} />
        </VStack>
      )}
    </LoadedContentController>
  );
});
