import { Heading, Text, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

const About: React.FC = () => {
  return (
    <VStack>
      <Heading>Tell about us</Heading>

      <Text>We are a team of developers ZeroSHA256Chain</Text>
      <Text>@chichmek @bohdan829 @gokuseii @van4o_0</Text>
    </VStack>
  );
};

export const Route = createFileRoute("/about")({
  component: About,
});
