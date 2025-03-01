import { VStack } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

import { Header } from "@/components/features";

const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About Us",
  },
];

const appName = "ZeroSHA256Chain";

const Root: React.FC = () => {
  return (
    <VStack background="black" color="white" minHeight="100vh" width="100vw">
      <Header
        routes={routes}
        appName={appName}
        p={4}
        borderBottom="1px solid"
        borderColor="gray.500"
      />

      <VStack w="fit-content" h="100%" as="main">
        <Outlet />
      </VStack>
    </VStack>
  );
};

export const Route = createRootRoute({
  component: Root,
});
