import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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

  async function fetchSubmitEvents() {
    const events = await service.getTaskSubmittedEvents();
    setTaskSubmittedEvents(events);
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
      <Button onClick={fetchSubmitEvents}>Fetch Task Submissions</Button>
    </div>
  );
};

export default Submissions;
