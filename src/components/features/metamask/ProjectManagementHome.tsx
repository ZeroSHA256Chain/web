import { Button, Presence, Show } from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { SmartContractRepository } from "@/blockchain/repository";
import { ProjectList } from "@/components/features";
import { connectedAccountAtom, web3Atom } from "@/store/atoms";
import { smartContractService } from "@/store/atoms/smartContract";

import AddProjectForm from "./AddProjectForm";
import RejectedTasks from "./RejectedTasks";
import Submissions from "./Submissions";
import { SubmitTask } from "./SubmitTask";
import TaskReviewForm from "./TaskReviewForm";
import VerifiedTasks from "./VerifiedTasks";
import { BaseProps, ProjectView } from "./models";
import { getSmartContractService } from "./smartContractService";

interface ProjectManagementHomeProps {}

export const ProjectManagementHome: React.FC<
  ProjectManagementHomeProps
> = () => {
  const [projects, setProjects] = useState<ProjectView[]>([]);

  const service = useAtomValue(smartContractService);

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
      ---------------Add Project-----------------
      {/* <AddProjectForm {...props} />
      -------------Submit Task---------------
      <SubmitTask {...props} />
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
