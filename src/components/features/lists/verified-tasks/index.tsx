import { Button, For, Heading, List, Stack, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";

import { toaster } from "@/components/ui";
import { TaskVerifiedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

import { TaskShortItem } from "../../items";

interface VerifiedTasksListProps {
  projectId: number;
  onVerifiedIdsChange: (verifiedsIds: number[]) => void;
}

export const VerifiedTasksList: React.FC<VerifiedTasksListProps> = ({
  projectId,
  onVerifiedIdsChange,
}) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [taskVerifiedEvents, setTaskVerifiedEvents] =
    useState<TaskVerifiedEvent[]>();

  const fetchAllVerifiedTasks = useCallback(async () => {
    if (!service) return;

    try {
      const taskVerifiedEvents = await service.getTaskVerifiedEvents({
        projectId,
      });

      setTaskVerifiedEvents(taskVerifiedEvents);

      onVerifiedIdsChange(taskVerifiedEvents.map((event) => event.projectId));
    } catch {
      toaster.create({
        description: "Error fetching verified tasks",
        type: "error",
      });
    }
  }, [service, onVerifiedIdsChange, projectId]);

  useEffect(() => {
    fetchAllVerifiedTasks();
  }, [fetchAllVerifiedTasks]);

  return (
    <Stack spaceY={4} p={4} bg="gray.700">
      <Heading bg="green.700" p={2}>
        Verified Tasks
      </Heading>

      <List.Root spaceY={3} listStyle="none">
        <For
          each={taskVerifiedEvents}
          fallback={<Text>No submissions found</Text>}
        >
          {(event) => (
            <List.Item key={event.projectId}>
              <TaskShortItem task={event} />
            </List.Item>
          )}
        </For>
      </List.Root>

      <Button
        fontWeight="bold"
        disabled={typeof projectId !== "number"}
        colorPalette="blue"
        onClick={() => fetchAllVerifiedTasks()}
      >
        Refetch
      </Button>
    </Stack>
  );
};
