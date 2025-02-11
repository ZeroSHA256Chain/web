import { Heading, Stack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import { TaskReviewForm } from "@/components/features";

const TaskId: React.FC = () => {
  const { taskId, projectId } = Route.useParams();

  return (
    <Stack>
      <Heading>
        Task ID: {taskId} in Project ID: {projectId}
      </Heading>

      <TaskReviewForm />
    </Stack>
  );
};

export const Route = createFileRoute("/projects/$projectId/tasks/$taskId")({
  component: TaskId,
});
