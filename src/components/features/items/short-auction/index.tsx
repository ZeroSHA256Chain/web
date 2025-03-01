import { ShortAuction } from "@/services";

interface ShortAuctionItemProps {
  auction: ShortAuction;
}

export const ShortAuctionItem = ({ auction }: ShortAuctionItemProps) => {
  return <div> {auction.name} </div>;
};
