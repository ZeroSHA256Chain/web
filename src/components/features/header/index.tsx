import {
  Box,
  BoxProps,
  Button,
  Flex,
  For,
  HStack,
  Heading,
  List,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import React from "react";

import { ConnectMetamask } from "@/components/features";

interface HeaderProps extends BoxProps {
  routes: {
    path: string;
    label: string;
  }[];
  appName: string;
}

export const Header: React.FC<HeaderProps> = ({
  routes,
  appName,
  ...props
}) => {
  return (
    <Box as="header" width="100%" {...props}>
      <Flex align="center" justify="space-between">
        <Heading
          as="h1"
          size="2xl"
          fontWeight="extrabold"
          letterSpacing="wide"
          textShadow="2px 2px 0 teal, -2px -2px 0 #000, 2px -2px 0 teal, -2px 2px 0 teal"
        >
          <Link to="/">{appName}</Link>
        </Heading>

        <Spacer />

        <HStack spaceX={4} as="nav">
          <List.Root display="flex" flexDirection="row" listStyle="none">
            <For each={routes}>
              {({ path, label }) => (
                <List.Item
                  h={10}
                  key={path}
                  fontWeight="semibold"
                  css={{
                    a: {
                      textDecoration: "none",
                    },
                  }}
                >
                  <Button colorPalette="teal" variant="ghost" color="white">
                    <Link to={path}>{label}</Link>
                  </Button>
                </List.Item>
              )}
            </For>
          </List.Root>

          <ConnectMetamask />
        </HStack>
      </Flex>
    </Box>
  );
};
