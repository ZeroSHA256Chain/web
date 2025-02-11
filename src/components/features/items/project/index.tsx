import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react";
import { memo } from "react";

import { ProjectView } from "@/services";

interface ProjectItemProps {
  project: ProjectView;
}

export const ProjectItem: React.FC<ProjectItemProps> = memo(({ project }) => {
  return (
    <Card.Root
      width="100%"
      shadow="md"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
    >
      <Card.Body>
        <Stack spaceX={3}>
          <Flex justify="space-between" align="center">
            <Heading size="md">{project.name}</Heading>

            <Flex gap={2}>
              <Show when={project.isRestricted}>
                <Badge colorPalette="red">Restricted</Badge>
              </Show>

              <Show when={project.allowResubmission}>
                <Badge colorPalette="green">Resubmission Allowed</Badge>
              </Show>
            </Flex>
          </Flex>

          <Text color="gray.600">{project.description}</Text>

          <Box>
            <Text fontSize="sm" fontWeight="bold">
              Mentor:{" "}
              <Text as="span" fontWeight="normal">
                {project.mentor}
              </Text>
            </Text>

            <Text fontSize="sm" fontWeight="bold">
              Deadline:{" "}
              <Text as="span" fontWeight="normal">
                {new Date(Number(project.deadline)).toLocaleString()}
              </Text>
            </Text>
          </Box>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
});
