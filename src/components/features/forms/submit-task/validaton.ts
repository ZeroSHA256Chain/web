import { z } from "zod";

import { SubmitTaskDto } from "@/services";

export const submitTaskSchema = z.object({
  projectId: z.number({
    required_error: "Project is required",
    invalid_type_error: "Please select a valid project",
  }),
  taskString: z.string().min(1, "Task content is required"),
}) satisfies z.ZodType<SubmitTaskDto>;
