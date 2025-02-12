import {
  Button,
  Fieldset,
  Field as FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { ProjectSelect } from "@/components/features";
import { FormFieldError, toaster } from "@/components/ui";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

import { SubmitTaskFormValues, submitTaskSchema } from "./validaton";
import { ProjectView } from "@/services";

interface SubmitTaskFormProps {
  project: ProjectView,
  projectId: number
}

export const SubmitTaskForm: React.FC<SubmitTaskFormProps> = ({ projectId }) => {
  const service = useAtomValue(smartContractServiceAtom);

  const { Field, Subscribe, handleSubmit, reset } =
    useForm<SubmitTaskFormValues>({
      defaultValues: {
        projectId: null,
        taskString: "",
      },
      onSubmit: async ({ value }) => {
        if (!service) return;

        try {
          await service.submitTaskAndHash({
            projectId: projectId,
            taskString: value.taskString,
          });
          console.log("Task submitted successfully");

          reset();

          toaster.create({
            description: "Task submitted successfully",
            type: "success",
          });
        } catch (error) {
          toaster.create({
            description: "Error submitting task",
            type: "error",
          });
        }
      },
      validators: {
        onChange: submitTaskSchema,
      },
    });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        handleSubmit();
      }}
    >
      <Fieldset.Root spaceY={4} bg="gray.700" p={4}>
        <Field
          name="taskString"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Task Content:
              </FormControl.Label>

              <Textarea
                minH={10}
                color="white"
                colorPalette="teal"
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button colorPalette="teal" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Submitting Task..." : "Submit Task"}
            </Button>
          )}
        />
      </Fieldset.Root>
    </form>
  );
};
