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
import React, { useCallback, useState } from "react";

import { ProjectSelect } from "@/components/features";
import { TaskRejectedEvent } from "@/services";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

interface RejectedTasksListProps {}

export const RejectedTasksList: React.FC<RejectedTasksListProps> = () => {
  const service = useAtomValue(smartContractServiceAtom);
  const projects = useAtomValue(projectsAtom);

  const [taskRejectedEvents, setTaskRejectedEvents] =
    useState<TaskRejectedEvent[]>();
  const [projectId, setProjectId] = useState<number | null>(null);

  const fetchAllRejectedTasks = useCallback(async () => {
    if (!service) return;

    setTaskRejectedEvents(await service.getTaskRejectedEvents());
  }, [service]);

  const fetchRejectedTask = useCallback(
    async (projectId: number | null) => {
      if (!service || !projectId) return;

      setTaskRejectedEvents(
        await service.getTaskRejectedEvents({ projectId: projectId })
      );
    },
    [service]
  );

  return (
    <Stack spaceY={4} p={4} bg="red.100">
      <Heading>Rejected Tasks</Heading>

      <ProjectSelect
        projects={projects}
        value={[projectId?.toString() ?? ""]}
        onChange={(value) => setProjectId(Number(value[0]))}
      />

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
          All Task Submissions
        </Button>

        <Button
          disabled={!projectId}
          colorPalette="blue"
          onClick={() => fetchRejectedTask(projectId)}
        >
          Task Submissions For Project {projectId}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
