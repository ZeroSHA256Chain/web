import { Button, Presence, Show } from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { SmartContractRepository } from "@/blockchain/repository";
import { AddProjectForm, ProjectList } from "@/components/features";
import { ProjectView } from "@/services";
import { connectedAccountAtom, web3Atom } from "@/store/atoms";
import { smartContractServiceAtom } from "@/store/atoms/smartContract";

import RejectedTasks from "./RejectedTasks";
import Submissions from "./Submissions";
import { SubmitTask } from "./SubmitTask";
import TaskReviewForm from "./TaskReviewForm";
import VerifiedTasks from "./VerifiedTasks";
import { getSmartContractService } from "./smartContractService";

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
