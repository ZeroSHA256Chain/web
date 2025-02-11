import { Button, For, Heading, List, Stack } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { memo, useRef } from "react";

import { ProjectView } from "@/services";

import { ProjectItem } from "./item";

interface ProjectListProps {
  list: ProjectView[];
  fetchList: () => Promise<void>;
}

export const ProjectList: React.FC<ProjectListProps> = memo(
  ({ list, fetchList }) => {
    const parentRef = useRef(null);

    const virtualizer = useVirtualizer({
      count: list.length,
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
                <ProjectItem project={list[virtualRow.index]} />
              </List.Item>
            )}
          </For>
        </List.Root>

        <Button colorPalette="teal" onClick={fetchList}>
          Fetch Projects
        </Button>
      </Stack>
    );
  }
);
