import { Box, Center, Spinner, VStack } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { Header } from "@/components/features";

const routes = [
  {
    path: "/",
    label: "Home",
  },

  {
    path: "/create-auction",
    label: "Create Auction",
  },
  {
    path: "/about",
    label: "About Us",
  },
];

const appName = "ZeroSHA256Chain";

const Root: React.FC = () => {
  return (
    <VStack background="black" color="white" minHeight="100vh">
      <Suspense
        fallback={
          <Box
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
          </Box>
        }
      >
        <Header
          routes={routes}
          appName={appName}
          p={4}
          borderBottom="1px solid"
          borderColor="border.muted"
        />

        <Center as="main" w="full" h="100%" py={4}>
          <Outlet />
        </Center>
      </Suspense>
    </VStack>
  );
};

export const Route = createRootRoute({
  component: Root,
});
