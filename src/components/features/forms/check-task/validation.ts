import { z } from "zod";

import { ETHEREUM_ADDRESS_PATTERN } from "@/constants/patterns";

export const checkTaskSchema = z.object({
  projectId: z.number().min(0, "Project ID is required").nullable(),
  student: z
    .string()
    .min(1, "Student address is required")
    .regex(ETHEREUM_ADDRESS_PATTERN, "Must be a valid Ethereum address")
    .nullable(),
});

export type CheckTaskFormValues = z.infer<typeof checkTaskSchema>;
