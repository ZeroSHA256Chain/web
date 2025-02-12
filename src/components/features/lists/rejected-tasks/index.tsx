import {
  Button,
  ButtonGroup,
  For,
  Heading,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";

import { toaster } from "@/components/ui";
import { ProjectView, TaskRejectedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

interface RejectedTasksListProps {
  project: ProjectView,
  projectId: number
}

export const RejectedTasksList: React.FC<RejectedTasksListProps> = ({ project, projectId }) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [taskRejectedEvents, setTaskRejectedEvents] =
    useState<TaskRejectedEvent[]>();

  useEffect(() => {
    fetchAllRejectedTasks();
  }, [])

  const fetchAllRejectedTasks = useCallback(async () => {
    if (!service) return;

    try {
      setTaskRejectedEvents(await service.getTaskRejectedEvents({ projectId: projectId }));
    } catch (error) {
      toaster.create({
        description: "Error fetching rejected tasks",
        type: "error",
      });
    }
  }, [service]);

  return (
    <Stack spaceY={4} p={4} bg="red.100">
      <Heading>Rejected Tasks</Heading>

      <List.Root spaceY={3}>
        <For
          each={taskRejectedEvents}
          fallback={<Text>No submissions found</Text>}
        >
          {(event) => (
            <List.Item
              key={event.projectId}
              p={3}
              borderWidth="1px"
              borderRadius="md"
            >
              <Text as="span" fontWeight="bold">
                Project ID: {event.projectId}, Student: {event.student}
              </Text>
            </List.Item>
          )}
        </For>
      </List.Root>

      <ButtonGroup display="flex" justifyContent="center" spaceX={4}>
        <Button colorPalette="blue" onClick={() => fetchAllRejectedTasks()}>
          Refetch rejected tasks
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
