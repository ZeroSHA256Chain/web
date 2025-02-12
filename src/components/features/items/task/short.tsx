import { Text, VStack } from "@chakra-ui/react";

import {
  TaskRejectedEvent,
  TaskSubmittedEvent,
  TaskVerifiedEvent,
} from "@/services";

type TasksEvent = TaskRejectedEvent | TaskVerifiedEvent | TaskSubmittedEvent;

interface TaskShortItemProps<T extends TasksEvent> {
  task: T;
}
export const TaskShortItem = <T extends TasksEvent>({
  task,
}: TaskShortItemProps<T>) => {
  return (
    <VStack
      spaceY={2}
      align="start"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      shadow="sm"
    >
      <Text fontSize="sm" color="gray.600">
        Project ID:
        <Text as="span" ml={2} fontWeight="semibold" color="gray.900">
          {task.projectId}
        </Text>
      </Text>

      <Text fontSize="sm" color="gray.600">
        Student:
        <Text as="span" ml={2} fontWeight="semibold" color="gray.900">
          {task.student}
        </Text>
      </Text>
    </VStack>
  );
};
