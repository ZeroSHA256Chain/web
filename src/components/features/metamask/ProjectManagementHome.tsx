import { HStack, Show, Spinner, Stack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import {
  AddProjectForm,
  ProjectList,
  SubmissionsList,
  SubmitTaskForm,
} from "@/components/features";
import { ProjectView } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

interface ProjectManagementHomeProps {}

export const ProjectManagementHome: React.FC<
  ProjectManagementHomeProps
> = () => {
  const [projects, setProjects] = useState<ProjectView[]>([]);

  const service = useAtomValue(smartContractServiceAtom);

  const fetchProjects = useCallback(async () => {
    if (!service) return;

    const projectItems = await service.getAllProjects();

    setProjects(projectItems);
  }, [service]);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Show
        when={projects.length > 0}
        fallback={
          <Stack align="center" justify="center" h={300}>
            <Spinner
              size="xl"
              borderWidth="4px"
              colorPalette="teal"
              color="teal.600"
            />
          </Stack>
        }
      >
        <HStack>
          <ProjectList list={projects} fetchList={fetchProjects} />

          <SubmissionsList projects={projects} />
        </HStack>

        <HStack>
          <AddProjectForm />

          <SubmitTaskForm projects={projects} />
        </HStack>
      </Show>

      {/* <TaskReviewForm {...props} /> */}

      {/* --------------All Submissions------------------
      <Submissions {...props} />
      -------------------Task Review----------------------
      <TaskReviewForm {...props} />
      ----------------Verified Tasks-------------------
      <VerifiedTasks {...props} />
      ----------------Rejected Tasks-------------------
      <RejectedTasks {...props} /> */}
    </>
  );
};
