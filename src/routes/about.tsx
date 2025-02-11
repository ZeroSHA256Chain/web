import { Heading, Text, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

const About: React.FC = () => {
  return (
    <VStack>
      <Heading>Tell about us</Heading>

      <Text>We are a team of developers who build this shit.</Text>
    </VStack>
  );
};

export const Route = createFileRoute("/about")({
  component: About,
});
