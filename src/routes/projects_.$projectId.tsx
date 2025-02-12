import { SubmitedTasksList, VerifiedTasksList, RejectedTasksList, SubmitTaskForm, ProjectItem } from "@/components/features";
import { ProjectView } from "@/services";
import { connectedAccountAtom, smartContractServiceAtom } from "@/store/atoms";
import { HStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const ProjectId: React.FC = () => {
  const { projectId: projectIdParam } = Route.useParams();
  const projectIdNum = Number(projectIdParam);

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
    
    if (!connectedAccount) return

    const project = await service.getProject(projectIdNum);
    const canSubmit = await service.isAllowedStudent({ projectId: projectIdNum, student: connectedAccount });
    const canVerify = await service.isVerifier({ projectId: projectIdNum, student: connectedAccount });

    setProject(project);
    setCanSubmit(canSubmit)
    setCanVerify(canVerify)
  }

  if (!project) {
    return (<div>Provide project id</div>)
  }

  if (isNaN(projectIdNum)) {
    return (<div>Provide valid project id</div>)
  }

  return (
    <div>

      <ProjectItem project={project} />

      {canVerify ?
        <>
          <SubmitedTasksList project={project} projectId={projectIdNum}/>

          <VerifiedTasksList project={project} projectId={projectIdNum}/>

          <RejectedTasksList project={project} projectId={projectIdNum}/>
        </>
        : null}

      {canSubmit ?
        <HStack>
          <SubmitTaskForm project={project} projectId={projectIdNum}/>
        </HStack> : null
      }

    </div>

  );
};

export const Route = createFileRoute("/projects_/$projectId")({
  component: ProjectId,
});
