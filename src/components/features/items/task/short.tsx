import { Button, HStack, Show, Text, VStack } from "@chakra-ui/react";

import { toaster } from "@/components/ui";
import { formatLongString } from "@/helpers";
import { TaskRejectedEvent, TaskVerifiedEvent } from "@/services";

type TasksEvent = TaskRejectedEvent | TaskVerifiedEvent;

interface TaskShortItemProps<T extends TasksEvent> {
  task: T;
}
export const TaskShortItem = <T extends TasksEvent>({
  task,
}: TaskShortItemProps<T>) => {
  const isVerified = "grade" in task;

  return (
    <VStack
      spaceY={2}
      align="start"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="gray.900"
      color="white"
      shadow="sm"
    >
      <HStack>
        <Text as="span" fontWeight="semibold">
          Project ID:
        </Text>

        <Text>{task.projectId}</Text>
      </HStack>

      <HStack>
        <Text as="span" fontWeight="semibold">
          Student:
        </Text>

        <Button
          h={7}
          variant="subtle"
          colorPalette="teal"
          onClick={async () => {
            await navigator.clipboard.writeText(task.student);

            toaster.create({
              title: "Copied to clipboard",
              description: "Student address copied",
              type: "success",
            });
          }}
        >
          {formatLongString(task.student)}
        </Button>
      </HStack>

      <Show when={isVerified}>
        <HStack>
          <Text as="span" fontWeight="semibold">
            Grade:
          </Text>

          <Text>{isVerified && (task.grade as number)}</Text>
        </HStack>
      </Show>
    </VStack>
  );
};
