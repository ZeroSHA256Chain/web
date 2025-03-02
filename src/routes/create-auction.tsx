import { createFileRoute } from "@tanstack/react-router";

import { CreateAuctionForm } from "@/components/features";

const CreateAuction = () => {
  return <CreateAuctionForm />;
};

export const Route = createFileRoute("/create-auction")({
  component: CreateAuction,
});
