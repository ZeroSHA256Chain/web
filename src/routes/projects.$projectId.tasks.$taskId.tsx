import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/tasks/$taskId')({
  component: TaskId,
})

function TaskId() {
  const { taskId, projectId } = Route.useParams()

  return (
    <div>
      Task ID: {taskId} in Project ID: {projectId}
    </div>
  )
}
