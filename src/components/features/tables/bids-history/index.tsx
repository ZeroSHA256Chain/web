import { For, Heading, Table, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";

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
  id: number;
}

export const BidsHistory: React.FC<BidsHistoryProps> = memo(
  ({ bestBid, bidsCount, id }) => {
    const {
      data: bids,
      isLoading,
      isError,
      isFetched,
    } = useAuctionFetch<Bid[]>({
      method: "_getMockBids",
      args: { id },
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
            <Heading as="h3" fontWeight="bold" fontSize="lg">
              Bids History
            </Heading>

            <Table.ScrollArea maxH={300}>
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
                      <Text
                        color="teal.300"
                        fontSize="sm"
                        fontFamily="monospace"
                      >
                        {formatETHAddress(bestBid.sender, { long: true })}
                      </Text>
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

            <Text color="fg.muted" fontSize="sm">
              Total Bids: {bidsCount.toString()}
            </Text>
          </VStack>
        )}
      </LoadedContentController>
    );
  }
);
