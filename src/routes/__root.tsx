import { VStack } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

import { Header } from "@/components/features";

export const Route = createRootRoute({
  component: () => (
    <VStack background="teal.100" minHeight="100vh" width="100vw">
      <Header />

      <Outlet />
    </VStack>
  ),
});
