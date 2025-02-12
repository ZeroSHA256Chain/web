import { z } from "zod";

import { ETHEREUM_ADDRESS_PATTERN } from "@/constants/patterns";
import { CreateProjectDto } from "@/services";

export const addProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  deadline: z.number().min(Date.now(), "Deadline must be in the future"),
  allowResubmission: z.boolean(),
  verifiers: z
    .array(z.string())
    .refine(
      (array) => array.every((item) => item.match(ETHEREUM_ADDRESS_PATTERN)),
      "All verifier addresses must be valid Ethereum addresses"
    ),
  allowedStudents: z
    .array(z.string())
    .refine(
      (array) => array.every((item) => item.match(ETHEREUM_ADDRESS_PATTERN)),
      "All allowed students addresses must be valid Ethereum addresses"
    ),
}) satisfies z.ZodType<CreateProjectDto>;
