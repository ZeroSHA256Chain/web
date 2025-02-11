import { z } from "zod";

import { CreateProjectDto } from "@/services";

export const addProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  deadline: z.number().min(Date.now() / 1000, "Deadline must be in the future"),
  allowResubmission: z.boolean(),
  verifiers: z
    .array(z.string())
    .refine(
      (array) => array.every((item) => item.match(/^0x[a-fA-F0-9]{40}$/)),
      "All verifier addresses must be valid Ethereum addresses"
    ),
  allowedStudents: z.array(z.string()),
}) satisfies z.ZodType<CreateProjectDto>;
