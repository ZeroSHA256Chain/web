import { Heading, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import { CheckTaskForm } from "@/components/features";

const VerifySubmission: React.FC = () => {
  return (
    <VStack spaceY={4} borderRadius="md" p={4} bg="gray.900" color="white">
      <Heading as="h2" fontSize="lg">
        Verify Submission
      </Heading>

      <CheckTaskForm />
    </VStack>
  );
};

export const Route = createFileRoute("/verify-submission")({
  component: VerifySubmission,
});
