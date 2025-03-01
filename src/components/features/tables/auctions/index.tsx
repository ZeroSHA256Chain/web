import { Badge, For, Table, Text } from "@chakra-ui/react";

import { formatDate, formatETHAddress, gweiToETH } from "@/helpers";
import { AuctionStatus, ShortAuction } from "@/services";

const STATUS_MAP = {
  [AuctionStatus.Active]: { color: "green", label: "Active" },
  [AuctionStatus.Ended]: { color: "gray", label: "Ended" },
  [AuctionStatus.Declined]: { color: "red", label: "Declined" },
  [AuctionStatus.WaitFinalization]: {
    color: "orange",
    label: "Finalization",
  },
} as const;

const AUCTION_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "bestBid", label: "Best Bid (ETH)" },
  { key: "bidStep", label: "Min Step (ETH)" },
  { key: "status", label: "Status" },
  { key: "endTime", label: "Date" },
  { key: "creator", label: "Creator" },
] as const;

export const AuctionsTable = ({ auctions }: { auctions: ShortAuction[] }) => {
  return (
    <Table.ScrollArea
      borderWidth="1px"
      maxW={{
        base: 320,
        md: 600,
        lg: 1000,
      }}
    >
      <Table.Root variant="outline" colorScheme="teal" interactive>
        <Table.Header>
          <Table.Row>
            <For each={AUCTION_COLUMNS}>
              {(column) => (
                <Table.ColumnHeader key={column.key} color="gray.500">
                  {column.label}
                </Table.ColumnHeader>
              )}
            </For>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {auctions.map((auction) => (
            <Table.Row key={auction.id.toString()}>
              <Table.Cell>
                <Text fontWeight="medium">{auction.name}</Text>
              </Table.Cell>

              <Table.Cell>
                <Text>{gweiToETH(auction.bestBid)}</Text>
              </Table.Cell>

              <Table.Cell>
                <Text>{gweiToETH(auction.bidStep)}</Text>
              </Table.Cell>

              <Table.Cell>
                <Badge
                  colorPalette={STATUS_MAP[auction.status].color}
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {STATUS_MAP[auction.status].label}
                </Badge>
              </Table.Cell>

              <Table.Cell>
                <Text>{formatDate(auction.endTime)}</Text>
              </Table.Cell>

              <Table.Cell>
                <Text color="teal.300" fontSize="sm" fontFamily="monospace">
                  {formatETHAddress(auction.creator, { long: true })}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};
