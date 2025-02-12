import { Box } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

const ProjectId: React.FC = () => {
  const { projectId } = Route.useParams();

  return (
    <Box p={20} bg="red">
      Project ID: {projectId}
    </Box>
  );
};

export const Route = createFileRoute("/projects_/$projectId")({
  component: ProjectId,
});
