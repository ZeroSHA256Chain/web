import { Web3 } from "web3";

import { SMART_CONTRACT_ABI, SmartContractRepository } from "@/blockchain";

import {
  CreateProjectDto,
  ProjectCreatedEvent,
  ProjectCreatedEventFilter,
  ProjectView,
  RejectTaskDto,
  SubmitTaskDto,
  TaskRejectedEvent,
  TaskRejectedEventFilter,
  TaskSubmittedEvent,
  TaskSubmittedEventFilter,
  TaskVerifiedEvent,
  TaskVerifiedEventFilter,
  VerifyTaskDto,
} from "./types";

export const getSmartContractService = (
  connectedAccount: string
): SmartContractService => {
  const repository = new SmartContractRepository(
    import.meta.env.VITE_PROVIDER_URL,
    import.meta.env.VITE_SMART_CONTRACT_ADDRESS,
    SMART_CONTRACT_ABI,
    connectedAccount
  );

  return new SmartContractService(repository);
};

export class SmartContractService {
  constructor(private repository: SmartContractRepository) {}

  async getProjectCount(): Promise<number> {
    try {
      return await this.repository.getProjectCount();
    } catch (error) {
      throw new Error(`SmartContract address is wrong: ${error}`);
    }
  }

  async createProject(dto: CreateProjectDto): Promise<void> {
    try {
      await this.repository.createProject(
        dto.name,
        dto.description,
        dto.deadline,
        dto.allowResubmission,
        dto.verifiers,
        dto.allowedStudents
      );
    } catch (error) {
      throw new Error(`SmartContract address is wrong: ${error}`);
    }
  }

  async getProject(projectId: number): Promise<ProjectView> {
    try {
      return await this.repository.getProject(projectId);
    } catch (error) {
      throw new Error(`SmartContract address is wrong: ${error}`);
    }
  }

  async getAllProjects(): Promise<ProjectView[]> {
    const projectCount = await this.repository.getProjectCount();

    const projectItems: ProjectView[] = [];

    for (let projectId = 0; projectId < projectCount; projectId++) {
      const {
        name,
        description,
        deadline,
        mentor,
        isRestricted,
        allowResubmission,
      } = await this.repository.getProject(projectId);

      projectItems.push({
        id: projectId,
        name,
        description,
        deadline,
        mentor,
        isRestricted,
        allowResubmission,
      });
    }

    return projectItems;
  }

  async submitTaskAndHash(dto: SubmitTaskDto): Promise<void> {
    try {
      const taskHash = Web3.utils.keccak256(dto.taskString);

      await this.repository.submitTask(dto.projectId, taskHash);
    } catch (error) {
      throw new Error(`SmartContract address is wrong: ${error}`);
    }
  }

  async verifyTask(dto: VerifyTaskDto): Promise<void> {
    try {
      await this.repository.verifyTask(dto.projectId, dto.student, dto.grade);
    } catch (error) {
      throw new Error(`SmartContract address is wrong: ${error}`);
    }
  }

  async rejectTask(dto: RejectTaskDto): Promise<void> {
    try {
      await this.repository.rejectTask(dto.projectId, dto.student);
    } catch (error) {
      throw new Error(`SmartContract address is wrong: ${error}`);
    }
  }

  async getProjectCreatedEvents(
    filter: ProjectCreatedEventFilter = {}
  ): Promise<ProjectCreatedEvent[]> {
    try {
      return await this.repository.getProjectCreatedEvents(filter);
    } catch (error) {
      throw new Error(`Failed to fetch Project Created Events: ${error}`);
    }
  }

  async getTaskSubmittedEvents(
    filter: TaskSubmittedEventFilter = {}
  ): Promise<TaskSubmittedEvent[]> {
    try {
      return await this.repository.getTaskSubmittedEvents(filter);
    } catch (error) {
      throw new Error(`Failed to fetch Task Submitted Events: ${error}`);
    }
  }

  async getTaskVerifiedEvents(
    filter: TaskVerifiedEventFilter = {}
  ): Promise<TaskVerifiedEvent[]> {
    try {
      return await this.repository.getTaskVerifiedEvents(filter);
    } catch (error) {
      throw new Error(`Failed to fetch Task Verified Events: ${error}`);
    }
  }

  async getTaskRejectedEvents(
    filter: TaskRejectedEventFilter = {}
  ): Promise<TaskRejectedEvent[]> {
    try {
      return await this.repository.getTaskRejectedEvents(filter);
    } catch (error) {
      throw new Error(`Failed to fetch Task Rejected Events: ${error}`);
    }
  }
}

export * from "./types";
