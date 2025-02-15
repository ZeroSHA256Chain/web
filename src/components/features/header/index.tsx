import {
  Box,
  BoxProps,
  Flex,
  For,
  HStack,
  Heading,
  List,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import React from "react";

import { ConnectMetamask } from "../metamask";

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
          color="white"
          fontWeight="extrabold"
          letterSpacing="wide"
          textShadow="2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"
        >
          <Link to="/">{appName}</Link>
        </Heading>

        <Spacer />

        <HStack spaceX={8} as="nav">
          <List.Root
            spaceX={4}
            display="flex"
            flexDirection="row"
            listStyle="none"
          >
            <For each={routes}>
              {({ path, label }) => (
                <List.Item
                  key={path}
                  fontWeight="semibold"
                  color="white"
                  css={{
                    a: {
                      textDecoration: "none",
                    },
                  }}
                >
                  <Link to={path}>{label}</Link>
                </List.Item>
              )}
            </For>
          </List.Root>

          <HStack spaceX={4}>
            <ConnectMetamask />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};
