import {
  For,
  HStack,
  Heading,
  IconButton,
  List,
  Show,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import React, { memo, useCallback, useState } from "react";

import { ProjectItem } from "@/components/features/items";
import { Dialog, Icon } from "@/components/ui";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

import { AddProjectForm } from "../../forms";

interface ProjectsListProps {}

export const ProjectsList: React.FC<ProjectsListProps> = memo(() => {
  const [projects, setProjects] = useAtom(projectsAtom);

  const service = useAtomValue(smartContractServiceAtom);

  const fetchProjects = useCallback(async () => {
    if (!service) return;

    const projectItems = await service.getAllProjects();

    setProjects(projectItems);
  }, [service, setProjects]);

  const [shouldCloseAddProjectDialog, setShouldCloseAddProjectDialog] =
    useState(false);

  const {
    open: isAddProjectDialogOpen,
    onOpen: onAddProjectDialogOpen,
    onClose: onAddProjectDialogClose,
  } = useDisclosure();

  return (
    <Stack width="auto" overflow="auto" spaceY={2} py={4} px={8} bg="pink.300">
      <HStack
        justify="space-between"
        align="center"
        bg="pink.400"
        py={2}
        px={8}
        borderRadius="md"
      >
        <Heading color="black">Projects</Heading>

        <IconButton
          variant="subtle"
          size="md"
          color="blue.700"
          onClick={fetchProjects}
        >
          <Icon name="RefreshCw" />
        </IconButton>
      </HStack>

      <List.Root
        w="100%"
        position="relative"
        gap={4}
        listStyle="none"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
      >
        <For
          each={projects}
          fallback={<Text color="gray.500">No projects found</Text>}
        >
          {(project) => (
            <List.Item key={project.name}>
              <ProjectItem project={project} />
            </List.Item>
          )}
        </For>
      </List.Root>

      <Show when={!shouldCloseAddProjectDialog}>
        <Dialog
          title="Add Project"
          triggerText="Add project"
          onClose={onAddProjectDialogClose}
          onOpen={onAddProjectDialogOpen}
          isOpen={isAddProjectDialogOpen}
          triggerColorPalette="green"
        >
          <AddProjectForm
            onSuccess={() => setShouldCloseAddProjectDialog(true)}
          />
        </Dialog>
      </Show>
    </Stack>
  );
});
