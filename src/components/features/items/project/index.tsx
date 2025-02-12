import {
  Badge,
  Button,
  Card,
  HStack,
  Heading,
  IconButton,
  Show,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { memo } from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Icon,
  toaster,
} from "@/components/ui";
import { formatEthereumAddress } from "@/helpers";
import { ProjectView } from "@/services";
import { connectedAccountAtom } from "@/store/atoms";

interface ProjectItemProps {
  project: ProjectView;
}

export const ProjectItem: React.FC<ProjectItemProps> = memo(({ project }) => {
  const connectedAccount = useAtomValue(connectedAccountAtom);

  return (
    <Card.Root
      color="white"
      bg="gray.900"
      width="100%"
      shadow="md"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
    >
      <Card.Body>
        <Stack spaceX={3} minH={160}>
          <HStack justify="space-between" align="center">
            <AccordionRoot multiple>
              <AccordionItem value={project.name}>
                <AccordionItemTrigger>
                  <Heading size="lg" textAlign="center">
                    {project.name}
                  </Heading>
                </AccordionItemTrigger>

                <AccordionItemContent>
                  <Text color="gray.500">{project.description}</Text>
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>

            <Link
              to={`/projects/$projectId`}
              params={{ projectId: String(project.id!) }}
            >
              <IconButton variant="ghost" size="xs" colorPalette="blue">
                <Icon name="ExternalLink" />
              </IconButton>
            </Link>
          </HStack>

          <HStack justify="end" align="center">
            <Show when={project.isRestricted}>
              <Badge colorPalette="red">Restricted</Badge>
            </Show>

            <Show when={project.allowResubmission}>
              <Badge colorPalette="green">Resubmission Allowed</Badge>
            </Show>
          </HStack>

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
                    description: `Mentor address copied`,
                    type: "success",
                  });
                }}
              >
                {connectedAccount === project.mentor
                  ? "Me"
                  : formatEthereumAddress(project.mentor)}
              </Button>
            </HStack>
          </VStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
});
