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
import { useCallback, useState } from "react";

import { ProjectSelect } from "@/components/features";
import { toaster } from "@/components/ui";
import { TaskSubmittedEvent } from "@/services";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

interface SubmitedTasksListProps {}

export const SubmitedTasksList: React.FC<SubmitedTasksListProps> = () => {
  const service = useAtomValue(smartContractServiceAtom);
  const projects = useAtomValue(projectsAtom);

  const [taskSubmittedEvents, setTaskSubmittedEvents] =
    useState<TaskSubmittedEvent[]>();
  const [projectId, setProjectId] = useState<number | null>(null);

  const fetchSubmitEventsForProject = useCallback(
    async (projectId: number | null) => {
      if (!service || typeof projectId !== "number") return;

      try {
        setTaskSubmittedEvents(
          await service.getTaskSubmittedEvents({ projectId })
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

  const fetchAllSubmitEvents = useCallback(async () => {
    if (!service) return;

    try {
      setTaskSubmittedEvents(await service.getTaskSubmittedEvents());
    } catch (error) {
      toaster.create({
        description: "Error fetching submitted tasks",
        type: "error",
      });
    }
  }, [service]);

  return (
    <Stack spaceY={4} p={4} bg="gray.700">
      <Heading>Submitted Tasks</Heading>

      <ProjectSelect
        projects={projects}
        value={[projectId?.toString() ?? ""]}
        onChange={(value) => setProjectId(Number(value[0]))}
      />

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
          onClick={async () => await fetchAllSubmitEvents()}
        >
          All Task Submissions
        </Button>

        <Button
          disabled={typeof projectId !== "number"}
          colorPalette="blue"
          onClick={async () => await fetchSubmitEventsForProject(projectId)}
        >
          Task Submissions For Project {projectId}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
