import { Button, Show } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import {
  AddProjectForm,
  ProjectList,
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

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    if (!service) return;
    const projectItems = await service.getAllProjects();

    setProjects(projectItems);
  }

  return (
    <>
      <Show when={projects.length > 0}>
        <ProjectList projects={projects} />
      </Show>

      <Button onClick={fetchProjects}>Fetch Projects</Button>

      <AddProjectForm />

      <Show when={projects.length > 0}>
        <SubmitTaskForm projects={projects} />
      </Show>
      {/* <AddProjectForm {...props} />
      -------------Submit Task---------------

      --------------All Submissions------------------
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
