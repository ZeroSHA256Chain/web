import Web3, { Contract } from "web3";
import { AbiItem } from "web3-utils";

export interface Submission {
  taskHash: string;
  isVerified: boolean;
  isRejected: boolean;
  grade: number;
}

export interface ProjectView {
  name: string;
  description: string;
  deadline: number;
  mentor: string;
  isRestricted: boolean;
  allowResubmission: boolean;
}

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
}
