import { createFileRoute } from "@tanstack/react-router";

import { CreateAuctionForm } from "@/components/features";

export const Route = createFileRoute("/create-auction")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateAuctionForm />;
}
