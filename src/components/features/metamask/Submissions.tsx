import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { BaseProps, TaskSubmittedEvent } from "./models";
import {
  SmartContractService,
  getSmartContractService,
} from "./smartContractService";

const Submissions: React.FC<BaseProps> = (props) => {
  const [service] = useState<SmartContractService>(
    getSmartContractService(props.connectedAccount)
  );
  const [taskSubmittedEvents, setTaskSubmittedEvents] =
    useState<TaskSubmittedEvent[]>();

  async function fetchSubmitEvents(projectId?: number) {
    if (projectId)
      setTaskSubmittedEvents(
        await service.getTaskSubmittedEvents({ projectId: projectId })
      );
    else setTaskSubmittedEvents(await service.getTaskSubmittedEvents());
  }

  return (
    <div>
      <ul>
        {taskSubmittedEvents?.map((event, i) => (
          <li key={i}>
            Project ID: {event.projectId}, Student: {event.student}, Task Hash:{" "}
            {event.taskHash}
          </li>
        ))}
      </ul>
      <Button onClick={() => fetchSubmitEvents()}>
        Fetch All Task Submissions
      </Button>
      <Button onClick={() => fetchSubmitEvents(1)}>
        Fetch Task Submissions For Project 1
      </Button>
    </div>
  );
};

export default Submissions;
