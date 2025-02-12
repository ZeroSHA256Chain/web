import { z } from "zod";

import { ETHEREUM_ADDRESS_PATTERN } from "@/constants/patterns";

export const reviewTaskSchema = z.object({
  projectId: z.number().min(0, "Project ID is required"),
  student: z
    .string()
    .min(1, "Student address is required")
    .regex(ETHEREUM_ADDRESS_PATTERN, "Must be a valid Ethereum address"),
  grade: z
    .number()
    .min(0, "Grade must be 0 or higher")
    .max(100, "Grade must be 100 or lower")
    .nullable(),
});

export type ReviewTaskFormValues = z.infer<typeof reviewTaskSchema>;
