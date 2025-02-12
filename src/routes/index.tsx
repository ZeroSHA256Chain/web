import { Alert, Show } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

import { ProjectsList } from "@/components/features";
import { connectedAccountAtom } from "@/store/atoms";

const Index: React.FC = () => {
  const connectedAccount = useAtomValue(connectedAccountAtom);

  return (
    <Show
      when={Boolean(connectedAccount)}
      fallback={
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title w="100%">
            Connect your account to see projects
          </Alert.Title>
        </Alert.Root>
      }
    >
      <ProjectsList />
    </Show>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
