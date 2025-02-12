import {
  For,
  HStack,
  Heading,
  IconButton,
  List,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import React, { memo, useCallback, useEffect, useState } from "react";

import { AddProjectForm } from "@/components/features";
import { ProjectItem } from "@/components/features/items";
import { Dialog, Icon } from "@/components/ui";
import { ProjectView } from "@/services";
import {
  connectedAccountAtom,
  projectsAtom,
  smartContractServiceAtom,
} from "@/store/atoms";

interface ProjectsListProps {}

export const ProjectsList: React.FC<ProjectsListProps> = memo(() => {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

  const setProjects = useSetAtom(projectsAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const service = useAtomValue(smartContractServiceAtom);

  const [categorizedProjects, setCategorizedProjects] = useState<{
    submit: ProjectView[];
    verify: ProjectView[];
    other: ProjectView[];
  }>({
    submit: [],
    verify: [],
    other: [],
  });

  const fetchProjects = useCallback(async () => {
    if (!service) return;
    if (!connectedAccount) return;

    const projectItems = await service.getAllProjects();
    if (!projectItems) return;

    const categorizedProjects = {
      submit: [] as ProjectView[],
      verify: [] as ProjectView[],
      other: [] as ProjectView[],
    };

    for (const project of projectItems) {
      if (project.id === undefined) {
        console.warn("Project ID is undefined");
        continue;
      }

      try {
        const isAllowed = await service.isAllowedStudent({
          projectId: project.id,
          student: connectedAccount,
        });

        const isVerifier = await service.isVerifier({
          projectId: project.id,
          student: connectedAccount,
        });

        if (isAllowed) {
          categorizedProjects.submit.push(project);
        } else if (isVerifier) {
          categorizedProjects.verify.push(project);
        } else {
          categorizedProjects.other.push(project);
        }
      } catch (error) {
        console.error(`Error processing project ${project.id}:`, error);

        categorizedProjects.other.push(project);
      }
    }

    setProjects(projectItems);
    setCategorizedProjects(categorizedProjects);
  }, [service, connectedAccount, setProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Stack
      h="100%"
      width="100vw"
      overflow="auto"
      spaceY={2}
      py={4}
      px={8}
      bg="gray.700"
      color="white"
    >
      <HStack
        justify="space-between"
        align="center"
        bg="gray.200"
        py={2}
        px={4}
        borderRadius="md"
      >
        <Heading as="h2" fontSize="2xl" color="black">
          Projects
        </Heading>

        <HStack spaceX={2}>
          <Dialog
            title="Add Project"
            triggerText="Add project"
            onOpenChange={(event) => setIsAddProjectDialogOpen(event.open)}
            isOpen={isAddProjectDialogOpen}
            triggerColorPalette="green"
          >
            <AddProjectForm
              onSuccess={() => setIsAddProjectDialogOpen(false)}
            />
          </Dialog>

          <IconButton
            bg="blue.500"
            colorPalette="blue"
            variant="subtle"
            size="md"
            onClick={fetchProjects}
          >
            <Icon name="RefreshCw" />
          </IconButton>
        </HStack>
      </HStack>

      <VStack
        align="start"
        spaceY={4}
        border="1px solid white"
        p={4}
        borderRadius="md"
      >
        <Heading as="h4">Projects you can submit</Heading>

        <List.Root
          w="100%"
          position="relative"
          gap={4}
          listStyle="none"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
        >
          <For
            each={categorizedProjects.submit}
            fallback={<Text>No projects found</Text>}
          >
            {(project) => (
              <List.Item key={project.name}>
                <ProjectItem project={project} />
              </List.Item>
            )}
          </For>
        </List.Root>
      </VStack>

      <VStack
        align="start"
        spaceY={4}
        border="1px solid white"
        p={4}
        borderRadius="md"
      >
        <Heading as="h4">Projects you can verify</Heading>

        <List.Root
          w="100%"
          position="relative"
          gap={4}
          listStyle="none"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
        >
          <For
            each={categorizedProjects.verify}
            fallback={<Text>No projects found</Text>}
          >
            {(project) => (
              <List.Item key={project.name}>
                <ProjectItem project={project} />
              </List.Item>
            )}
          </For>
        </List.Root>
      </VStack>

      <VStack
        align="start"
        spaceY={4}
        border="1px solid white"
        p={4}
        borderRadius="md"
      >
        <Heading as="h4">Other projects</Heading>

        <List.Root
          w="100%"
          position="relative"
          gap={4}
          listStyle="none"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
        >
          <For
            each={categorizedProjects.other}
            fallback={<Text>No projects found</Text>}
          >
            {(project) => (
              <List.Item key={project.name}>
                <ProjectItem project={project} />
              </List.Item>
            )}
          </For>
        </List.Root>
      </VStack>
    </Stack>
  );
});
