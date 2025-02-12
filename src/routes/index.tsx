import { Show, Spinner, Stack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

import {
  ProjectsList
} from "@/components/features";
import { projectsAtom } from "@/store/atoms";

const Index: React.FC = () => {
  const projects = useAtomValue(projectsAtom);

  return (
    <>
      <ProjectsList />

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
      </Show>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
