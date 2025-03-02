import { createFileRoute } from "@tanstack/react-router";

import { AuctionDetails } from "@/components/features";

const Auction = () => {
  const { auctionId } = Route.useParams();

  return <AuctionDetails id={Number(auctionId)} />;
};

export const Route = createFileRoute("/$auctionId")({
  component: Auction,
});
