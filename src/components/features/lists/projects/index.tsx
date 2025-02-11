import { For, Heading, List, Stack, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React, { memo } from "react";

import { ProjectItem } from "@/components/features/items";
import { projectsAtom } from "@/store/atoms";

interface ProjectsListProps {}

export const ProjectsList: React.FC<ProjectsListProps> = memo(() => {
  const projects = useAtomValue(projectsAtom);

  return (
    <Stack
      maxH={800}
      width="auto"
      overflow="auto"
      spaceY={2}
      py={4}
      px={8}
      bg="pink.200"
    >
      <Heading color="black">Projects</Heading>

      <List.Root
        w="100%"
        position="relative"
        gap={4}
        listStyle="none"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
      >
        <For each={projects} fallback={<Text>No projects found</Text>}>
          {(project) => (
            <List.Item key={project.name}>
              <ProjectItem project={project} />
            </List.Item>
          )}
        </For>
      </List.Root>
    </Stack>
  );
});
