import {
  Button,
  For,
  HStack,
  Heading,
  List,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { TaskItem, TaskReviewForm } from "@/components/features";
import { Dialog, toaster } from "@/components/ui";
import { TaskSubmittedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

interface SubmitedTasksListProps {
  projectId: number;
  processedTasks: number[];
}

export const SubmitedTasksList: React.FC<SubmitedTasksListProps> = ({
  projectId,
  processedTasks,
}) => {
  const service = useAtomValue(smartContractServiceAtom);
  const [isReviewTaskDialogOpen, setIsReviewTaskDialogOpen] = useState(false);

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

      <List.Root spaceY={3} listStyle="none">
        <For
          each={taskSubmittedEvents}
          fallback={<Text>No submissions found</Text>}
        >
          {(event) => (
            <List.Item key={event.projectId}>
              <VStack
                w="100%"
                align="start"
                justify="start"
                bg="gray.900"
                p={2}
                gap={4}
                borderRadius="md"
              >
                <TaskItem task={event} />

                <HStack w="100%" align="center" justify="center">
                  <Dialog
                    title="Task Review"
                    triggerText="Review Task"
                    triggerColorPalette="teal"
                    onOpenChange={(event) =>
                      setIsReviewTaskDialogOpen(event.open)
                    }
                    isOpen={isReviewTaskDialogOpen}
                  >
                    <TaskReviewForm
                      onSuccess={() => setIsReviewTaskDialogOpen(false)}
                      projectId={projectId}
                      studentAddress={event.student}
                    />
                  </Dialog>
                </HStack>
              </VStack>
            </List.Item>
          )}
        </For>
      </List.Root>

      <Button
        fontWeight="bold"
        colorPalette="blue"
        onClick={async () => await fetchSubmitEventsForProject()}
      >
        Refetch
      </Button>
    </Stack>
  );
};
