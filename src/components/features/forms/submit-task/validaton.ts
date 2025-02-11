import { z } from "zod";

export const submitTaskSchema = z.object({
  projectId: z
    .number({
      required_error: "Project is required",
      invalid_type_error: "Please select a valid project",
    })
    .nullable(),
  taskString: z.string().min(1, "Task content is required"),
});

export type SubmitTaskFormValues = z.infer<typeof submitTaskSchema>;
