import { SubmitedTasksList, VerifiedTasksList, RejectedTasksList, SubmitTaskForm, ProjectItem } from "@/components/features";
import { ProjectView } from "@/services";
import { connectedAccountAtom, smartContractServiceAtom } from "@/store/atoms";
import { Box, HStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const ProjectId: React.FC = () => {
  const { projectId: projectIdParam } = Route.useParams();
  const [project, setProject] = useState<ProjectView>();
  const service = useAtomValue(smartContractServiceAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [canSubmit, setCanSubmit] = useState<boolean>()
  const [canVerify, setCanVerify] = useState<boolean>()

  useEffect(() => {
    fetchProject();
  }, []);

  async function fetchProject() {
    if (!service) return;
    const projectId = Number(projectIdParam);
    if (isNaN(projectId)) return;
    if (!connectedAccount) return

    const project = await service.getProject(projectId);
    const canSubmit = await service.isAllowedStudent({ projectId, student: connectedAccount });
    const canVerify = await service.isVerifier({ projectId, student: connectedAccount });

    setProject(project);
    setCanSubmit(canSubmit)
    setCanVerify(canVerify)
  }

  if (!project) {
    return (<div>Provide project id</div>)
  }

  return (
    <div>

      <ProjectItem project={project} />

      {canVerify ?
        <>
          <SubmitedTasksList />

          <VerifiedTasksList />

          <RejectedTasksList />
        </>
        : null}

      {canSubmit ?
        <HStack>
          <SubmitTaskForm />
        </HStack> : null
      }

    </div>

  );
};

export const Route = createFileRoute("/projects_/$projectId")({
  component: ProjectId,
});
