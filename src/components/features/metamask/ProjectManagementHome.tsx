import { useEffect, useState } from "react";

import AddProjectForm from "./AddProjectForm";
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
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.id}, {project.name}, {project.description}, Resubmission:{" "}
            {project.allowResubmission.toString()}
          </li>
        ))}
      </ul>

      <AddProjectForm {...props} />
    </>
  );
};

export default ProjectManagementHome;
