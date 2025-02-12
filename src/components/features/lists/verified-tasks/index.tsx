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
import { ProjectView, TaskVerifiedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

interface VerifiedTasksListProps {
  project: ProjectView,
  projectId: number
}

export const VerifiedTasksList: React.FC<VerifiedTasksListProps> = ({project, projectId}) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [taskVerifiedEvents, setTaskVerifiedEvents] =
    useState<TaskVerifiedEvent[]>();

  useEffect(() => {
    fetchAllVerifiedTasks()
  }, [])

  const fetchAllVerifiedTasks = useCallback(async () => {
    if (!service) return;

    try {
      setTaskVerifiedEvents(await service.getTaskVerifiedEvents({projectId: projectId}));
    } catch (error) {
      toaster.create({
        description: "Error fetching verified tasks",
        type: "error",
      });
    }
  }, [service]);

  return (
    <Stack spaceY={4} p={4} bg="green.100">
      <Heading>Verified Tasks</Heading>

      <List.Root spaceY={3}>
        <For
          each={taskVerifiedEvents}
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
        <Button
          disabled={typeof projectId !== "number"}
          colorPalette="blue"
          onClick={() => fetchAllVerifiedTasks()}
        >
          Verified Tasks
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
