import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects_/$projectId')({
  component: ProjectId,
})

function ProjectId() {
  const { projectId } = Route.useParams()

  return <div>Project ID: {projectId}</div>
}
