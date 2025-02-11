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
import { TaskVerifiedEvent } from "@/services";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

interface VerifiedTasksListProps {}

export const VerifiedTasksList: React.FC<VerifiedTasksListProps> = () => {
  const service = useAtomValue(smartContractServiceAtom);
  const projects = useAtomValue(projectsAtom);

  const [taskVerifiedEvents, setTaskVerifiedEvents] =
    useState<TaskVerifiedEvent[]>();
  const [projectId, setProjectId] = useState<number | null>(null);

  const fetchAllVerifiedTasks = useCallback(async () => {
    if (!service) return;

    setTaskVerifiedEvents(await service.getTaskVerifiedEvents());
  }, [service]);

  const fetchVerifiedTask = useCallback(
    async (projectId: number | null) => {
      if (!service || !projectId) return;

      setTaskVerifiedEvents(
        await service.getTaskVerifiedEvents({ projectId: projectId })
      );
    },
    [service]
  );

  return (
    <Stack spaceY={4} p={4} bg="green.100">
      <Heading>Verified Tasks</Heading>

      <ProjectSelect
        projects={projects}
        value={[projectId?.toString() ?? ""]}
        onChange={(value) => setProjectId(Number(value[0]))}
      />

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
        <Button colorPalette="blue" onClick={() => fetchAllVerifiedTasks()}>
          All Task Submissions
        </Button>

        <Button
          disabled={!projectId}
          colorPalette="blue"
          onClick={() => fetchVerifiedTask(projectId)}
        >
          Task Submissions For Project {projectId}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
