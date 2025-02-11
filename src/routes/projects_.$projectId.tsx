import { createFileRoute } from "@tanstack/react-router";

const ProjectId: React.FC = () => {
  const { projectId } = Route.useParams();

  return <div>Project ID: {projectId}</div>;
};

export const Route = createFileRoute("/projects_/$projectId")({
  component: ProjectId,
});
