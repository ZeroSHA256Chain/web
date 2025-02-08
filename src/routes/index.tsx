import { createFileRoute } from "@tanstack/react-router";

import { Avatar } from "@/components/ui/avatar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Avatar colorScheme="blue">Click me</Avatar>

      <h3>Welcome Home!</h3>
    </div>
  );
}
