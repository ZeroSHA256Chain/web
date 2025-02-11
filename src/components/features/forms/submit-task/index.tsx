import {
  Button,
  Fieldset,
  Field as FormControl,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { ProjectSelect } from "@/components/features";
import { FormFieldError, toaster } from "@/components/ui";
import { ProjectView, SubmitTaskDto } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

import { submitTaskSchema } from "./validaton";

interface SubmitTaskFormProps {
  projects: ProjectView[];
}

export const SubmitTaskForm: React.FC<SubmitTaskFormProps> = ({ projects }) => {
  const service = useAtomValue(smartContractServiceAtom);

  const { Field, Subscribe, handleSubmit, reset } = useForm<SubmitTaskDto>({
    defaultValues: {
      projectId: -1, // default value
      taskString: "",
    },
    onSubmit: async ({ value }) => {
      if (!service) return;

      await service.submitTaskAndHash(value);

      reset();

      toaster.create({
        description: "Task submitted successfully",
        type: "success",
      });
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
          name="projectId"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Project:
              </FormControl.Label>

              <ProjectSelect
                projects={projects}
                value={[field.state.value.toString()]}
                onChange={(values) => field.handleChange(Number(values[0]))}
              />

              <FormFieldError field={field} />
            </FormControl.Root>
          )}
        />

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

              <FormFieldError field={field} />
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
