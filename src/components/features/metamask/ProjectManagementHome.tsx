import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  ProjectView,
  SmartContractRepository,
} from "@/blockchain/SmartContractRepository";

import { BaseProps } from "./models";
import { getSmartContractRepository } from "./smartContract";

const ProjectManagementHome: React.FC<BaseProps> = ({ connectedAccount }) => {
  const [projects, setProjects] = useState<ProjectView[]>([]);
  const [repo] = useState<SmartContractRepository>(
    getSmartContractRepository(connectedAccount)
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  async function doThing() {
    await repo.createProject(
      "Project 1",
      "Description 1",
      1739789181,
      false,
      [],
      []
    );
  }

  async function fetchProjects() {
    const projectCount = await repo.getProjectCount();

    const projectItems = [];
    for (let projectId = 0; projectId < projectCount; projectId++) {
      projectItems.push(await repo.getProject(projectId));
    }

    setProjects(projectItems);
  }

  return (
    <>
      <Button variant="solid" colorPalette="pink" onClick={() => doThing()}>
        Do thing
      </Button>
    </>
  );
};

export default ProjectManagementHome;
