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
import React, { memo, useEffect, useState } from "react";

import { ProjectItem } from "@/components/features/items";
import { Dialog, Icon } from "@/components/ui";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

import { AddProjectForm } from "../../forms";
import { ProjectView } from "@/services";

interface ProjectsListProps {}

export const ProjectsList: React.FC<ProjectsListProps> = memo(() => {
  const [projects, setProjects] = useAtom(projectsAtom);
  const [categorizedProjects, setCategorizedProjects] = useState<{
    submit: ProjectView[];
    verify: ProjectView[];
    other: ProjectView[];
}>({
    submit: [],
    verify: [],
    other: []})

  const service = useAtomValue(smartContractServiceAtom);

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    if (!service) return;
  
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
          student: project.mentor,
        });
  
        const isVerifier = await service.isVerifier({
          projectId: project.id,
          student: project.mentor,
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
  };

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

      Projects you can submit
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
          fallback={<Text color="gray.500">No projects found</Text>}
        >
          {(project) => (
            <List.Item key={project.name}>
              <ProjectItem project={project} />
            </List.Item>
          )}
          
        </For>
      </List.Root>
      
      Projects you can verify
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
          fallback={<Text color="gray.500">No projects found</Text>}
        >
          {(project) => (
            <List.Item key={project.name}>
              <ProjectItem project={project} />
            </List.Item>
          )}
          
        </For>
      </List.Root>

      Other projects
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
