import { Box, For, List, Text } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { memo, useRef } from "react";

import { ProjectView } from "@/services";

import { ProjectItem } from "./item";

interface ProjectListProps {
  projects: ProjectView[];
}

export const ProjectList: React.FC<ProjectListProps> = memo(({ projects }) => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: projects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 10,
    overscan: 5,
  });

  return (
    <Box ref={parentRef} className="List" h="200px" w="400px" overflow="auto">
      <List.Root
        h={`${virtualizer.getTotalSize()}px`}
        w="100%"
        position="relative"
        spaceY={2}
      >
        <For each={virtualizer.getVirtualItems()}>
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
    </Box>
  );
});
