import { Box, Flex, HStack, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import React from "react";

interface indexProps {}

export const Header: React.FC<indexProps> = () => {
  return (
    <Box as="header" bg="blue.700" p={4} color="white" width="100%">
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="lg" color="yellow.400">
          ZeroSHA256Chain
        </Heading>

        <Spacer />

        <HStack
          spaceX={4}
          css={{
            a: {
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            },
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </HStack>
      </Flex>
    </Box>
  );
};
