import Web3 from "web3";

export interface BaseProps {
  web3: Web3;
  connectedAccount: string;
}

export interface Submission {
  taskHash: string;
  isVerified: boolean;
  isRejected: boolean;
  grade: number;
}

export interface ProjectView {
  id?: number;
  name: string;
  description: string;
  deadline: number;
  mentor: string;
  isRestricted: boolean;
  allowResubmission: boolean;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  deadline: number;
  allowResubmission: boolean;
  verifiers: string[];
  allowedStudents: string[];
}

export interface SubmitTaskDto {
  projectId: number;
  taskString: string;
}

export interface VerifyTaskDto {
  projectId: number;
  student: string;
  grade: number;
}

export interface RejectTaskDto {
  projectId: number;
  student: string;
}
