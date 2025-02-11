import {
  Badge,
  Button,
  Card,
  HStack,
  Heading,
  Show,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { memo } from "react";

import { toaster } from "@/components/ui";
import { ProjectView } from "@/services";

import { formatEthereumAddress } from "../../metamask/connect/utils";

interface ProjectItemProps {
  project: ProjectView;
}

export const ProjectItem: React.FC<ProjectItemProps> = memo(({ project }) => {
  return (
    <Card.Root
      color="white"
      bg="black"
      width="100%"
      shadow="md"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
    >
      <Card.Body>
        <Stack spaceX={3}>
          <Heading size="lg" textAlign="center">
            {project.name}
          </Heading>

          <HStack justify="end" align="center">
            <Show when={project.isRestricted}>
              <Badge colorPalette="red">Restricted</Badge>
            </Show>

            <Show when={project.allowResubmission}>
              <Badge colorPalette="green">Resubmission Allowed</Badge>
            </Show>
          </HStack>

          <Text color="gray.700">{project.description}</Text>

          <VStack spaceY={2} align="start">
            <HStack spaceX={2}>
              <Text fontSize="sm" fontWeight="bold">
                Deadline:
              </Text>

              <Badge colorPalette="orange">
                {new Date(Number(project.deadline)).toLocaleString()}
              </Badge>
            </HStack>
            <HStack spaceX={2}>
              <Text fontSize="sm" fontWeight="bold">
                Mentor:
              </Text>

              <Button
                h={7}
                variant="subtle"
                colorPalette="pink"
                onClick={async () => {
                  await navigator.clipboard.writeText(project.mentor);

                  toaster.create({
                    title: "Copied to clipboard",
                    description: `Mentor address copied to clipboard: ${project.mentor}`,
                    type: "success",
                  });
                }}
              >
                {formatEthereumAddress(project.mentor)}
              </Button>
            </HStack>
          </VStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
});
