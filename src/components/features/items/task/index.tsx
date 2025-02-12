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
    <HStack
      spaceX={6}
      align="start"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
    >
      <VStack align="start" spaceX={2}>
        <HStack>
          <Text as="span" fontWeight="semibold" color="gray.600">
            Project ID:
          </Text>

          <Text>{task.projectId}</Text>
        </HStack>

        <HStack>
          <Text as="span" fontWeight="semibold" color="gray.600">
            Student:
          </Text>

          <Text>{task.student}</Text>
        </HStack>

        <HStack>
          <Text as="span" fontWeight="semibold" color="gray.600">
            Task Hash:
          </Text>

          <Button
            h={7}
            variant="subtle"
            colorPalette="white"
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
    </HStack>
  );
};
