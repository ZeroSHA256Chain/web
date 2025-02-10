import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

import { BaseProps, TaskVerifiedEvent } from "./models";
import {
  SmartContractService,
  getSmartContractService,
} from "./smartContractService";

const VerifiedTasks: React.FC<BaseProps> = (props) => {
  const [service] = useState<SmartContractService>(
    getSmartContractService(props.connectedAccount)
  );
  const [taskVerifiedEvents, setTaskVerifiedEvents] =
    useState<TaskVerifiedEvent[]>();

  async function fetchVerifiedEvents(projectId?: number) {
    if (projectId)
      setTaskVerifiedEvents(
        await service.getTaskVerifiedEvents({ projectId: projectId })
      );
    else setTaskVerifiedEvents(await service.getTaskVerifiedEvents());
  }

  return (
    <div>
      <ul>
        {taskVerifiedEvents?.map((event, i) => (
          <li key={i}>
            Project ID: {event.projectId}, Student: {event.student}, Task Hash:{" "}
            {event.taskHash}, Grade: {event.grade}
          </li>
        ))}
      </ul>
      <Button onClick={() => fetchVerifiedEvents()}>
        Fetch All Verified Tasks
      </Button>
      <Button onClick={() => fetchVerifiedEvents(1)}>
        Fetch Verified Tasks For Project 1
      </Button>
    </div>
  );
};

export default VerifiedTasks;
