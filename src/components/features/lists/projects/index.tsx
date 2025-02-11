import { For, Heading, List, Stack, Text } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAtomValue } from "jotai";
import React, { memo, useRef } from "react";

import { projectsAtom } from "@/store/atoms";

import { ProjectItem } from "./item";

interface ProjectsListProps {}

export const ProjectsList: React.FC<ProjectsListProps> = memo(() => {
  const projects = useAtomValue(projectsAtom);

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: projects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  return (
    <Stack
      ref={parentRef}
      h={800}
      width={400}
      overflow="auto"
      spaceY={4}
      p={4}
      bg="gray.700"
    >
      <Heading>Projects</Heading>

      <List.Root
        h={`${virtualizer.getTotalSize()}px`}
        w="100%"
        position="relative"
        spaceY={2}
      >
        <For
          each={virtualizer.getVirtualItems()}
          fallback={<Text>No projects found</Text>}
        >
          {(virtualRow) => (
            <List.Item
              key={virtualRow.key}
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h={`${virtualRow.size}px`}
              transform={`translateY(${virtualRow.start}px)`}
            >
              <ProjectItem project={projects[virtualRow.index]} />
            </List.Item>
          )}
        </For>
      </List.Root>
    </Stack>
  );
});
