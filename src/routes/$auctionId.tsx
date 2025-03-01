import { createFileRoute } from "@tanstack/react-router";

import { AuctionItem } from "@/components/features";

const AuctionRoute = () => {
  const { auctionId } = Route.useParams();

  return <AuctionItem id={Number(auctionId)} />;
};

export const Route = createFileRoute("/$auctionId")({
  component: AuctionRoute,
});
