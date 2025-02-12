import { Button, For, Heading, List, Stack, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { toaster } from "@/components/ui";
import { TaskSubmittedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

import { TaskItem } from "../../items";

interface SubmitedTasksListProps {
  projectId: number;
  processedTasks: number[];
}

export const SubmitedTasksList: React.FC<SubmitedTasksListProps> = ({
  projectId,
  processedTasks,
}) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [taskSubmittedEvents, setTaskSubmittedEvents] =
    useState<TaskSubmittedEvent[]>();

  useEffect(() => {
    fetchSubmitEventsForProject();
  }, []);

  const fetchSubmitEventsForProject = useCallback(async () => {
    if (!service) return;

    try {
      const taskSubmittedEvents = await service.getTaskSubmittedEvents({
        projectId,
      });

      const filteredTaskSubmittedEvents = taskSubmittedEvents.filter(
        (event) => !processedTasks.includes(event.projectId)
      );

      setTaskSubmittedEvents(filteredTaskSubmittedEvents);
    } catch (error) {
      toaster.create({
        description: "Error fetching submitted tasks",
        type: "error",
      });
    }
  }, [service, processedTasks, projectId]);

  return (
    <Stack spaceY={4} p={4} bg="gray.700">
      <Heading p={2}>Submitted Tasks</Heading>

      <List.Root spaceY={3}>
        <For
          each={taskSubmittedEvents}
          fallback={<Text>No submissions found</Text>}
        >
          {(event) => (
            <List.Item key={event.projectId}>
              <TaskItem task={event} />
            </List.Item>
          )}
        </For>
      </List.Root>

      <Button
        colorPalette="blue"
        onClick={async () => await fetchSubmitEventsForProject()}
      >
        Refetch
      </Button>
    </Stack>
  );
};
