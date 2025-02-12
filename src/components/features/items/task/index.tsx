import { Button, HStack, Text, VStack } from "@chakra-ui/react";

import { toaster } from "@/components/ui";
import { formatLongString } from "@/helpers";
import { TaskSubmittedEvent } from "@/services";

interface TaskItemProps<T extends TaskSubmittedEvent> {
  task: T;
}

export const TaskItem = <T extends TaskSubmittedEvent>({
  task,
}: TaskItemProps<T>) => {
  return (
    <VStack
      spaceY={2}
      align="start"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
      color="white"
      bg="gray.900"
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

      <HStack>
        <Text as="span" fontWeight="semibold">
          Task Hash:
        </Text>

        <Button
          h={7}
          variant="subtle"
          colorPalette="blue"
          onClick={async () => {
            await navigator.clipboard.writeText(task.taskHash);

            toaster.create({
              title: "Copied to clipboard",
              description: "Task hash copied",
              type: "success",
            });
          }}
        >
          {formatLongString(task.taskHash)}
        </Button>
      </HStack>
    </VStack>
  );
};
