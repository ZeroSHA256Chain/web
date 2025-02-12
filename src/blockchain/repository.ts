import Web3, { AbiFragment, Contract, EventLog } from "web3";
import { AbiItem } from "web3-utils";

import {
  ProjectCreatedEvent,
  ProjectCreatedEventFilter,
  ProjectView,
  Submission,
  TaskRejectedEvent,
  TaskRejectedEventFilter,
  TaskSubmittedEvent,
  TaskSubmittedEventFilter
} from "@/services";

export class SmartContractRepository {
  private web3: Web3;
  private contract: Contract<AbiFragment[]>;

  constructor(
    provider: string,
    contractAddress: string,
    abi: AbiItem[],
    private account: string
  ) {
    this.web3 = new Web3(provider);

    this.contract = new this.web3.eth.Contract(abi, contractAddress);
  }

  async getProjectCount(): Promise<number> {
    return await this.contract.methods.projectCount().call();
  }

  async createProject(
    name: string,
    description: string,
    deadline: number,
    allowResubmission: boolean,
    verifiers: string[],
    allowedStudents: string[]
  ): Promise<void> {
    await this.contract.methods
      .createProject(
        name,
        description,
        deadline,
        allowResubmission,
        verifiers,
        allowedStudents
      )
      .send({ from: this.account });
  }

  async submitTask(projectId: number, taskHash: string): Promise<void> {
    await this.contract.methods
      .submitTask(projectId, taskHash)
      .send({ from: this.account });
  }

  async verifyTask(
    projectId: number,
    student: string,
    grade: number
  ): Promise<void> {
    await this.contract.methods
      .verifyTask(projectId, student, grade)
      .send({ from: this.account });
  }

  async rejectTask(projectId: number, student: string): Promise<void> {
    await this.contract.methods
      .rejectTask(projectId, student)
      .send({ from: this.account });
  }

  async getSubmission(projectId: number, student: string): Promise<Submission> {
    return await this.contract.methods.getSubmission(projectId, student).call();
  }

  async getProject(projectId: number): Promise<ProjectView> {
    return await this.contract.methods.getProject(projectId).call();
  }

  async isAllowedStudent(projectId: number, student: string): Promise<boolean> {
    const result: boolean = await this.contract.methods.isAllowedStudent(projectId, student).call();
    console.log("Is Allowed student: ", result);
    return result
  }

  async isVerifier(projectId: number, student: string): Promise<boolean> {
    const result: boolean = await this.contract.methods.isVerifier(projectId, student).call();

    console.log("Is Verifier: ", result)

    return result
  }

  async getProjectCreatedEvents(
    filter: ProjectCreatedEventFilter = {}
  ): Promise<ProjectCreatedEvent[]> {
    const contractAny = this.contract as any;
    const events: EventLog[] = await contractAny.getPastEvents(
      "ProjectCreated",
      { filter: filter, fromBlock: 0 }
    );

    const event = events.map((event) => ({
      projectId: event.returnValues["projectId"] as number,
      name: event.returnValues["name"] as string,
      mentor: event.returnValues["mentor"] as string,
    }));

    return event;
  }

  async getTaskSubmittedEvents(
    filter: TaskSubmittedEventFilter = {}
  ): Promise<TaskSubmittedEvent[]> {
    const contractAny = this.contract as any;
    const events: EventLog[] = await contractAny.getPastEvents(
      "TaskSubmitted",
      { filter: filter, fromBlock: 0 }
    );
    console.log(events);
  
    const lastSubmittedTasks: { [key: string]: TaskSubmittedEvent } = {};
  
    events.forEach((event) => {
      const student = event.returnValues["student"] as string;
      const projectId = event.returnValues["projectId"] as number;
      const submissionId = event.returnValues["submissionId"] as number;
      const task = {
        projectId: projectId,
        submissionId: submissionId,
        student: student,
        taskHash: event.returnValues["taskHash"] as string,
      };
      
      // Create a unique key combining student and projectId
      const key = `${student}-${projectId}`;
      
      // Update the map with the last task for this student and projectId
      lastSubmittedTasks[key] = task;
    });
  
    // Convert the map to an array
    return Object.values(lastSubmittedTasks);
  }

  async getTaskRejectedEvents(
    filter: TaskRejectedEventFilter = {}
  ): Promise<TaskRejectedEvent[]> {
    const contractAny = this.contract as any;
    const events: EventLog[] = await contractAny.getPastEvents("TaskRejected", {
      filter: filter,
      fromBlock: 0,
    });
    const event = events.map((event) => ({
      projectId: event.returnValues["projectId"] as number,
      student: event.returnValues["student"] as string,
    }));

    return event;
  }
}
