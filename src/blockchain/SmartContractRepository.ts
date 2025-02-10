import Web3, { EventLog } from "web3";
import { AbiItem } from "web3-utils";

import {
  ProjectCreatedEvent,
  ProjectCreatedEventFilter,
  ProjectView,
  Submission,
  TaskRejectedEvent,
  TaskRejectedEventFilter,
  TaskSubmittedEvent,
  TaskSubmittedEventFilter,
  TaskVerifiedEvent,
  TaskVerifiedEventFilter,
} from "@/components/features/metamask/models";

export class SmartContractRepository {
  private web3: Web3;
  private contract;
  private account: string;

  constructor(
    provider: string,
    contractAddress: string,
    abi: AbiItem[],
    account: string
  ) {
    this.web3 = new Web3(provider);
    const contractAbi = abi;
    this.contract = new this.web3.eth.Contract(contractAbi, contractAddress);
    this.account = account;
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

  async checkTaskVerified(taskHash: string): Promise<number> {
    return await this.contract.methods.checkTaskVerified(taskHash).call();
  }

  async getSubmission(projectId: number, student: string): Promise<Submission> {
    return await this.contract.methods.getSubmission(projectId, student).call();
  }

  async getProject(projectId: number): Promise<ProjectView> {
    return await this.contract.methods.getProject(projectId).call();
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
    const event = events.map((event) => ({
      projectId: event.returnValues["projectId"] as number,
      student: event.returnValues["student"] as string,
      taskHash: event.returnValues["taskHash"] as string,
    }));
    return event;
  }

  async getTaskVerifiedEvents(
    filter: TaskVerifiedEventFilter = {}
  ): Promise<TaskVerifiedEvent[]> {
    const contractAny = this.contract as any;
    const events: EventLog[] = await contractAny.getPastEvents("TaskVerified", {
      filter: filter,
      fromBlock: 0,
    });
    const event = events.map((event) => ({
      projectId: event.returnValues["projectId"] as number,
      student: event.returnValues["student"] as string,
      taskHash: event.returnValues["taskHash"] as string,
      grade: event.returnValues["grade"] as number,
    }));
    return event;
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
