import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { BaseProps, SubmitTaskDto } from "./models";
import {
  SmartContractService,
  getSmartContractService,
} from "./smartContractService";

export const SubmitTask: React.FC<BaseProps> = (props) => {
  const [service] = useState<SmartContractService>(
    getSmartContractService(props.connectedAccount)
  );
  const [projectId, setProjectId] = useState<number>(0);
  const [taskString, setTaskString] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const dto: SubmitTaskDto = { projectId, taskString };
    await service.submitTaskAndHash(dto);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: "red", padding: "20px" }}
    >
      <label>
        Project ID:
        <input
          type="number"
          value={projectId}
          onChange={(e) => setProjectId(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Task Description:
        <textarea
          value={taskString}
          onChange={(e) => setTaskString(e.target.value)}
          required
        />
      </label>
      <Button type="submit">Submit Task</Button>
    </form>
  );
};
