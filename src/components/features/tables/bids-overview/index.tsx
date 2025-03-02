import { For, Table, Text } from "@chakra-ui/react";
import { memo } from "react";

import { ETHEREUM_TOKEN } from "@/constants";
import { gweiToETH } from "@/helpers";

const BIDS_COLUMNS = [
  { key: "bestBid", label: `Best Bid (${ETHEREUM_TOKEN})` },
  { key: "bidStep", label: `Bid Step (${ETHEREUM_TOKEN})` },
  { key: "minBid", label: `Min Bid (${ETHEREUM_TOKEN})` },
] as const;

interface BidsOverviewTableProps {
  bestBid: number;
  bidStep: number;
}

export const BidsOverviewTable = memo(
  ({ bestBid, bidStep }: BidsOverviewTableProps) => {
    return (
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <For each={BIDS_COLUMNS}>
              {(column) => (
                <Table.ColumnHeader key={column.key} color="fg.muted">
                  {column.label}
                </Table.ColumnHeader>
              )}
            </For>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>{gweiToETH(bestBid)}</Text>
            </Table.Cell>

            <Table.Cell>
              <Text>{gweiToETH(bidStep)}</Text>
            </Table.Cell>

            <Table.Cell>
              <Text>{gweiToETH(bestBid + bidStep)}</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    );
  }
);
