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
import { Dialog, toaster } from "@/components/ui";
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

  const [isSubmitTaskDialogOpen, setIsSubmitTaskDialogOpen] = useState(false);

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
    } catch {
      toaster.create({
        description: "Error fetching project",
      });
    }
  }, [service, connectedAccount, projectIdAsNumber]);

  useEffect(() => {
    fetchProject();
  }, []);

  if (!project) {
    return <Spinner borderWidth="4px" />;
  }

  if (!isNaN && isNaN(projectIdAsNumber)) {
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

  return (
    <VStack w="80vw">
      <ProjectItem project={project} linkDisabled />

      <HStack w="100%" gap={4} align="start" justify="center">
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
          <Dialog
            title="Submit Task"
            triggerText="Submit Task"
            triggerColorPalette="teal"
            onOpenChange={(event) => setIsSubmitTaskDialogOpen(event.open)}
            isOpen={isSubmitTaskDialogOpen}
          >
            <SubmitTaskForm
              onSuccess={() => setIsSubmitTaskDialogOpen(false)}
              projectId={projectIdAsNumber}
            />
          </Dialog>
        </Show>
      </HStack>
    </VStack>
  );
};

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectId,
});
