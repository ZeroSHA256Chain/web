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
import { ProjectView, TaskSubmittedEvent } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

interface SubmissionsProps {
  projects: ProjectView[];
}

export const SubmissionsList: React.FC<SubmissionsProps> = ({ projects }) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [taskSubmittedEvents, setTaskSubmittedEvents] =
    useState<TaskSubmittedEvent[]>();
  const [projectId, setProjectId] = useState<number | null>(null);

  const fetchSubmitEventsForProject = useCallback(
    async (projectId: number | null) => {
      if (!service || !projectId) return;

      setTaskSubmittedEvents(
        await service.getTaskSubmittedEvents({ projectId })
      );
    },
    [service]
  );

  const fetchAllSubmitEvents = useCallback(async () => {
    if (!service) return;

    setTaskSubmittedEvents(await service.getTaskSubmittedEvents());
  }, [service]);

  return (
    <Stack spaceY={4} p={4} bg="gray.700">
      <Heading>Task Submissions</Heading>

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
        <Button colorPalette="blue" onClick={() => fetchAllSubmitEvents()}>
          All Task Submissions
        </Button>

        <Button
          disabled={!projectId}
          colorPalette="blue"
          onClick={() => fetchSubmitEventsForProject(projectId)}
        >
          Task Submissions For Project {projectId}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
