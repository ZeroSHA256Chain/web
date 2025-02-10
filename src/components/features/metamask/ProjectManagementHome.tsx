import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import AddProjectForm from "./AddProjectForm";
import RejectedTasks from "./RejectedTasks";
import Submissions from "./Submissions";
import { SubmitTask } from "./SubmitTask";
import TaskReviewForm from "./TaskReviewForm";
import VerifiedTasks from "./VerifiedTasks";
import { BaseProps, ProjectView } from "./models";
import {
  SmartContractService,
  getSmartContractService,
} from "./smartContractService";

const ProjectManagementHome: React.FC<BaseProps> = (props) => {
  const [projects, setProjects] = useState<ProjectView[]>([]);
  const [service] = useState<SmartContractService>(
    getSmartContractService(props.connectedAccount)
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const projectItems = await service.getAllProjects();

    setProjects(projectItems);
  }

  return (
    <>
      --------------Project List--------------
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.id}, {project.name}, {project.description}, Resubmission:{" "}
            {project.allowResubmission.toString()}
          </li>
        ))}
      </ul>
      <Button onClick={fetchProjects}>Fetch Projects</Button>
      ---------------Add Project-----------------
      <AddProjectForm {...props} />
      -------------Submit Task---------------
      <SubmitTask {...props} />
      --------------All Submissions------------------
      <Submissions {...props} />
      -------------------Task Review----------------------
      <TaskReviewForm {...props} />
      ----------------Verified Tasks-------------------
      <VerifiedTasks {...props} />
      ----------------Rejected Tasks-------------------
      <RejectedTasks {...props} />
    </>
  );
};

export default ProjectManagementHome;
