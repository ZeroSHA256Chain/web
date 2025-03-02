import { For, IconButton, Table, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { memo } from "react";

import { AddressButton, AuctionStatusBadge } from "@/components/features";
import { Icon } from "@/components/ui";
import { ETHEREUM_TOKEN } from "@/constants";
import { formatDate, gweiToETH } from "@/helpers";
import { Auction } from "@/services";

const AUCTION_COLUMNS = [
  { key: "name", label: "Title" },
  { key: "bestBid", label: `Best Bid (${ETHEREUM_TOKEN})` },
  { key: "bidStep", label: `Bid Step (${ETHEREUM_TOKEN})` },
  { key: "status", label: "Status" },
  { key: "endTime", label: "Date" },
  { key: "creator", label: "Creator" },
  { key: "action", label: "" },
] as const;

export const AuctionsTable = memo(({ auctions }: { auctions: Auction[] }) => {
  return (
    <Table.ScrollArea
      borderWidth="1px"
      maxW={{
        base: "full",
        lg: 1000,
      }}
    >
      <Table.Root variant="outline" colorScheme="teal" interactive>
        <Table.Header>
          <Table.Row>
            <For each={AUCTION_COLUMNS}>
              {(column) => (
                <Table.ColumnHeader key={column.key} color="fg.muted">
                  {column.label}
                </Table.ColumnHeader>
              )}
            </For>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {auctions.map((auction) => (
            <Table.Row key={auction.id}>
              <Table.Cell>
                <Text fontWeight="medium">{auction.title}</Text>
              </Table.Cell>

              <Table.Cell>
                <Text>{gweiToETH(auction.bestBid?.price || 0)}</Text>
              </Table.Cell>

              <Table.Cell>
                <Text>{gweiToETH(auction.bidStep)}</Text>
              </Table.Cell>

              <Table.Cell>
                <AuctionStatusBadge status={auction.status} />
              </Table.Cell>

              <Table.Cell>
                <Text>{formatDate(Number(auction.endTime))}</Text>
              </Table.Cell>

              <Table.Cell>
                <AddressButton address={auction.creator} />
              </Table.Cell>

              <Table.Cell>
                <Link
                  to="/$auctionId"
                  params={{ auctionId: String(auction.id) }}
                >
                  <IconButton
                    w={5}
                    h={5}
                    variant="ghost"
                    aria-label="View Auction"
                    colorPalette="white"
                  >
                    <Icon name="ExternalLink" />
                  </IconButton>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
});
