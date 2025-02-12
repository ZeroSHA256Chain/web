import { Alert, HStack, Show, Spinner, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ProjectItem,
  RejectedTasksList,
  SubmitTaskForm,
  SubmitedTasksList,
  VerifiedTasksList,
} from "@/components/features";
import { toaster } from "@/components/ui";
import { ProjectView } from "@/services";
import { connectedAccountAtom, smartContractServiceAtom } from "@/store/atoms";

const ProjectId: React.FC = () => {
  const { projectId: projectId } = Route.useParams();

  const service = useAtomValue(smartContractServiceAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);

  const projectIdAsNumber = useMemo(() => Number(projectId), [projectId]);

  const [project, setProject] = useState<ProjectView>();
  const [canSubmit, setCanSubmit] = useState<boolean>();
  const [canVerify, setCanVerify] = useState<boolean>();
  const [verifiedIds, setVerifiedIds] = useState<number[]>([]);
  const [rejectedIds, setRejectedIds] = useState<number[]>([]);

  const fetchProject = useCallback(async () => {
    if (!service || !connectedAccount || isNaN(projectIdAsNumber)) return;

    try {
      const project = await service.getProject(projectIdAsNumber);
      const canSubmit = await service.isAllowedStudent({
        projectId: projectIdAsNumber,
        student: connectedAccount,
      });
      const canVerify = await service.isVerifier({
        projectId: projectIdAsNumber,
        student: connectedAccount,
      });

      setProject(project);
      setCanSubmit(canSubmit);
      setCanVerify(canVerify);
    } catch (error) {
      toaster.create({
        description: "Error fetching project",
      });
    }
  }, [service, connectedAccount, projectIdAsNumber]);

  useEffect(() => {
    fetchProject();
  }, []);

  if (isNaN(projectIdAsNumber)) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />

        <Alert.Title w="100%">Provide valid project id</Alert.Title>

        <Alert.Description>
          Please provide a valid project id to continue.
        </Alert.Description>
      </Alert.Root>
    );
  }

  if (!project) {
    return <Spinner borderWidth="4px" />;
  }

  return (
    <VStack>
      <ProjectItem project={project} linkDisabled />

      <HStack w="100%" gap={4}>
        <Show when={canVerify}>
          <SubmitedTasksList
            processedTasks={verifiedIds.concat(rejectedIds)}
            projectId={projectIdAsNumber}
          />

          <VerifiedTasksList
            projectId={projectIdAsNumber}
            onVerifiedIdsChange={(ids) => setVerifiedIds(ids)}
          />

          <RejectedTasksList
            projectId={projectIdAsNumber}
            onRejectedIdsChange={(ids) => setRejectedIds(ids)}
          />
        </Show>

        <Show when={canSubmit}>
          <SubmitTaskForm projectId={projectIdAsNumber} />
        </Show>
      </HStack>
    </VStack>
  );
};

export const Route = createFileRoute("/projects_/$projectId")({
  component: ProjectId,
});
