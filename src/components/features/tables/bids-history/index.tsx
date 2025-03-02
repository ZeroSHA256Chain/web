import { For, HStack, Heading, Table, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";

import { AddressButton } from "@/components/features";
import { LoadedContentController } from "@/components/utils";
import { ETHEREUM_TOKEN } from "@/constants";
import { formatDate, formatETHAddress, gweiToETH } from "@/helpers";
import { useAuctionFetch } from "@/hooks";
import { Bid } from "@/services";

const BID_COLUMNS = [
  { key: "sender", label: "Bidder" },
  { key: "price", label: `Amount (${ETHEREUM_TOKEN})` },
  { key: "date", label: "Date" },
] as const;

interface BidsHistoryProps {
  bestBid: Bid;
  bidsCount: bigint;
  auctionId: number;
}

export const BidsHistory: React.FC<BidsHistoryProps> = memo(
  ({ bestBid, bidsCount, auctionId }) => {
    const {
      data: bids,
      isLoading,
      isError,
      isFetched,
    } = useAuctionFetch<Bid[]>({
      method: "_getMockBids",
      args: { id: auctionId },
    });

    return (
      <LoadedContentController
        isLoading={isLoading}
        isError={isError}
        isEmpty={isFetched && bids?.length === 0}
        errorMessage="Failed to fetch bid history. Please try again."
        data={bids}
      >
        {(bids) => (
          <VStack align="start" w="full" spaceY={2}>
            <HStack justify="space-between" w="full">
              <Heading as="h3" fontWeight="bold" fontSize="lg">
                Bids History
              </Heading>

              <Text color="fg.muted" fontSize="sm">
                Total Bids:{" "}
                <Text as="span" fontWeight="bold" color="white">
                  {bidsCount.toString()}
                </Text>
              </Text>
            </HStack>

            <Table.ScrollArea w="full">
              <Table.Root variant="outline">
                <Table.Header>
                  <Table.Row>
                    <For each={BID_COLUMNS}>
                      {(column) => (
                        <Table.ColumnHeader key={column.key} color="text.muted">
                          {column.label}
                        </Table.ColumnHeader>
                      )}
                    </For>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <AddressButton address={bestBid.sender} />
                    </Table.Cell>

                    <Table.Cell>
                      <Text>{gweiToETH(Number(bestBid.price))}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text>{formatDate(Number(bestBid.date))}</Text>
                    </Table.Cell>
                  </Table.Row>

                  {bids.map((bid) => (
                    <Table.Row key={bid.id.toString()}>
                      <Table.Cell>
                        <Text
                          color="teal.300"
                          fontSize="sm"
                          fontFamily="monospace"
                        >
                          {formatETHAddress(bid.sender, { long: true })}
                        </Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Text>{gweiToETH(Number(bid.price))}</Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Text>{formatDate(Number(bid.date))}</Text>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </VStack>
        )}
      </LoadedContentController>
    );
  }
);
