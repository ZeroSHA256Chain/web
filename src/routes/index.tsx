import { VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import { ProjectManagementHome } from "@/components/features/metamask/ProjectManagementHome";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <VStack as="main" spaceX={4} padding={4}>
      <ProjectManagementHome />
    </VStack>
  );
}
