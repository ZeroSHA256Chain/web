import { HStack, Show, Spinner, Stack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

import {
  AddProjectForm,
  ProjectsList,
  RejectedTasksList,
  SubmitTaskForm,
  SubmitedTasksList,
  VerifiedTasksList,
} from "@/components/features";
import { projectsAtom } from "@/store/atoms";

const Index: React.FC = () => {
  const projects = useAtomValue(projectsAtom);

  return (
    <>
      <ProjectsList />

      <AddProjectForm />

      <Show
        when={projects.length > 0}
        fallback={
          <Stack align="center" justify="center" h={300}>
            <Spinner
              size="xl"
              borderWidth="4px"
              colorPalette="teal"
              color="teal.600"
            />
          </Stack>
        }
      >
        <HStack>
          <SubmitedTasksList />

          <VerifiedTasksList />

          <RejectedTasksList />
        </HStack>

        <HStack>
          <SubmitTaskForm />
        </HStack>
      </Show>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
