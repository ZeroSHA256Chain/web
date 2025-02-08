import { Heading, Text, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <VStack>
      <Heading>Tell about us</Heading>

      <Text>We are a team of developers who build this shit.</Text>
    </VStack>
  );
}
