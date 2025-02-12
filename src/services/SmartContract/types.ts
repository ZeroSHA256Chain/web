import Web3 from "web3";

export interface BaseProps {
  web3: Web3;
  connectedAccount: string;
}

export interface Submission {
  id: number;
  taskHash: string;
  isVerified: boolean;
  isRejected: boolean;
  grade: number;
}

export interface ProjectView {
  id?: number;
  name: string;
  description: string;
  deadline: bigint | number;
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

export interface ProjectCreatedEvent {
  projectId: number;
  name: string;
  mentor: string;
}

export interface ProjectCreatedEventFilter {
  projectId?: number;
  name?: string;
  mentor?: string;
}

export interface TaskSubmittedEvent {
  submissionId: number;
  projectId: number;
  student: string;
  taskHash: string;
}

export interface TaskSubmittedEventFilter {
  projectId?: number;
  student?: string;
  taskHash?: string;
}

export interface TaskVerifiedEvent {
  projectId: number;
  student: string;
  taskHash: string;
  grade: number;
}

export interface TaskVerifiedEventFilter {
  projectId?: number;
  student?: string;
  taskHash?: string;
  grade?: number;
}

export interface TaskRejectedEvent {
  projectId: number;
  student: string;
}

export interface TaskRejectedEventFilter {
  projectId?: number;
  student?: string;
}
