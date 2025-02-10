import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

import { BaseProps, TaskRejectedEvent } from "./models";
import {
  SmartContractService,
  getSmartContractService,
} from "./smartContractService";

const RejectedTasks: React.FC<BaseProps> = (props) => {
  const [service] = useState<SmartContractService>(
    getSmartContractService(props.connectedAccount)
  );
  const [taskRejectedEvents, setTaskRejectedEvents] =
    useState<TaskRejectedEvent[]>();

  async function fetchRejectedEvents(projectId?: number) {
    if (projectId)
      setTaskRejectedEvents(
        await service.getTaskRejectedEvents({ projectId: projectId })
      );
    else setTaskRejectedEvents(await service.getTaskRejectedEvents());
  }

  return (
    <div>
      <ul>
        {taskRejectedEvents?.map((event, i) => (
          <li key={i}>
            Project ID: {event.projectId}, Student: {event.student}
          </li>
        ))}
      </ul>
      <Button onClick={() => fetchRejectedEvents()}>
        Fetch All Verified Tasks
      </Button>
      <Button onClick={() => fetchRejectedEvents(1)}>
        Fetch Verified Tasks For Project 1
      </Button>
    </div>
  );
};

export default RejectedTasks;
