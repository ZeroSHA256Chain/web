import { Web3 } from "web3";

import { SmartContractRepository } from "@/blockchain/SmartContractRepository";
import ABI from "@/blockchain/smart_contract_abi.json";

import {
  CreateProjectDto,
  ProjectView,
  RejectTaskDto,
  SubmitTaskDto,
  VerifyTaskDto,
} from "./models";

const provider = "http://127.0.0.1:8545/";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getSmartContractService = (
  connectedAccount: string
): SmartContractService => {
  const repository = new SmartContractRepository(
    provider,
    contractAddress,
    ABI.abi,
    connectedAccount
  );

  return new SmartContractService(repository);
};

export class SmartContractService {
  private repository: SmartContractRepository;

  constructor(repository: SmartContractRepository) {
    this.repository = repository;
  }

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
      const projectItem = await this.repository.getProject(projectId);
      projectItem.id = projectId;
      projectItems.push(projectItem);
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
}
