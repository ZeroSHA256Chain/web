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
import { useCallback, useEffect, useState } from "react";

import { toaster } from "@/components/ui";
import { ProjectView, TaskSubmittedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

interface SubmitedTasksListProps {
  project: ProjectView,
  projectId: number
}

export const SubmitedTasksList: React.FC<SubmitedTasksListProps> = ({project, projectId}) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [taskSubmittedEvents, setTaskSubmittedEvents] =
    useState<TaskSubmittedEvent[]>();

  useEffect(() => {
    fetchSubmitEventsForProject()
  }, [])

  const fetchSubmitEventsForProject = useCallback(
    async () => {
      if (!service) return;

      try {
        setTaskSubmittedEvents(
          await service.getTaskSubmittedEvents({ projectId: projectId })
        );
      } catch (error) {
        toaster.create({
          description: "Error fetching submitted tasks",
          type: "error",
        });
      }
    },
    [service]
  );

  return (
    <Stack spaceY={4} p={4} bg="gray.700">
      <Heading>Submitted Tasks</Heading>

      <List.Root spaceY={3}>
        <For
          each={taskSubmittedEvents}
          fallback={<Text>No submissions found</Text>}
        >
          {(event) => (
            <List.Item
              key={event.taskHash}
              p={3}
              borderWidth="1px"
              borderRadius="md"
            >
              <Text>
                <Text as="span" fontWeight="bold">
                  Project ID:
                </Text>{" "}
                {event.projectId}
                <Text as="span" fontWeight="bold" ml={4}>
                  Student:
                </Text>{" "}
                {event.student}
                <Text as="span" fontWeight="bold" ml={4}>
                  Task Hash:
                </Text>{" "}
                {event.taskHash}
              </Text>
            </List.Item>
          )}
        </For>
      </List.Root>

      <ButtonGroup display="flex" justifyContent="center" spaceX={4}>
        <Button
          colorPalette="blue"
          onClick={async () => await fetchSubmitEventsForProject()}
        >
          Refetch Task Submissions
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
