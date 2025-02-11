import { z } from "zod";

import { CreateProjectDto } from "@/services";

export const addProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  deadline: z.number().min(Date.now() / 1000, "Deadline must be in the future"),
  allowResubmission: z.boolean(),
  verifiers: z.array(z.string()),
  allowedStudents: z.array(z.string()),
}) satisfies z.ZodType<CreateProjectDto>;
