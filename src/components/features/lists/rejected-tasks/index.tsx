import { Button, For, Heading, List, Stack, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";

import { toaster } from "@/components/ui";
import { TaskRejectedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

import { TaskShortItem } from "../../items";

interface RejectedTasksListProps {
  projectId: number;
  onRejectedIdsChange: (ids: number[]) => void;
}

export const RejectedTasksList: React.FC<RejectedTasksListProps> = ({
  projectId,
  onRejectedIdsChange,
}) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [taskRejectedEvents, setTaskRejectedEvents] =
    useState<TaskRejectedEvent[]>();

  const fetchAllRejectedTasks = useCallback(async () => {
    if (!service) return;

    try {
      const taskRejectedEvents = await service.getTaskRejectedEvents({
        projectId,
      });

      setTaskRejectedEvents(taskRejectedEvents);

      onRejectedIdsChange(taskRejectedEvents.map((event) => event.projectId));
    } catch (error) {
      toaster.create({
        description: "Error fetching rejected tasks",
        type: "error",
      });
    }
  }, [service, onRejectedIdsChange, projectId]);

  useEffect(() => {
    fetchAllRejectedTasks();
  }, []);

  return (
    <Stack spaceY={4} p={4} bg="gray.700">
      <Heading bg="red.700" p={2}>
        Rejected Tasks
      </Heading>

      <List.Root spaceY={3}>
        <For
          each={taskRejectedEvents}
          fallback={<Text>No submissions found</Text>}
        >
          {(event) => (
            <List.Item key={event.projectId}>
              <TaskShortItem task={event} />
            </List.Item>
          )}
        </For>
      </List.Root>

      <Button colorPalette="blue" onClick={() => fetchAllRejectedTasks()}>
        Refetch
      </Button>
    </Stack>
  );
};
