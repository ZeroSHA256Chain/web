import { For } from "@chakra-ui/react";

import { ShortAuctionItem } from "@/components/features/items";
import { ShortAuction } from "@/services";

interface AuctionListProps {
  auctions: ShortAuction[];
}

export const AuctionList = ({ auctions }: AuctionListProps) => {
  return (
    <For each={auctions}>
      {(auction) => <ShortAuctionItem key={auction.id} auction={auction} />}
    </For>
  );
};
