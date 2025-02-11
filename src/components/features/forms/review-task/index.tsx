import {
  Button,
  ButtonGroup,
  Fieldset,
  Field as FormControl,
  Input,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";
import { useState } from "react";

import { ProjectSelect } from "@/components/features";
import { FormFieldError, toaster } from "@/components/ui";
import { RejectTaskDto, VerifyTaskDto } from "@/services";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

import { Action } from "./types";
import { SubmitTaskFormValues, reviewTaskSchema } from "./validation";

interface TaskReviewFormProps {}

export const TaskReviewForm: React.FC<TaskReviewFormProps> = () => {
  const service = useAtomValue(smartContractServiceAtom);
  const projects = useAtomValue(projectsAtom);

  const [action, setAction] = useState<Action | null>(null);

  const { Field, Subscribe, handleSubmit } = useForm<SubmitTaskFormValues>({
    defaultValues: {
      projectId: null,
      student: "",
      grade: 50,
    },
    onSubmit: async ({ value }) => {
      if (!service || !action || !value.projectId) return;

      if (action === "verify") {
        const verifyData: VerifyTaskDto = {
          projectId: value.projectId,
          student: value.student,
          grade: value.grade,
        };

        await service.verifyTask(verifyData);

        toaster.create({
          description: "Task verified successfully",
          type: "success",
        });
      } else {
        const rejectData: RejectTaskDto = {
          projectId: value.projectId,
          student: value.student,
        };

        await service.rejectTask(rejectData);

        toaster.create({
          description: "Task rejected successfully",
          type: "success",
        });
      }
    },
    validators: {
      onChange: reviewTaskSchema,
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
                value={[field.state.value?.toString() ?? ""]}
                onChange={(values) => field.handleChange(Number(values[0]))}
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Field
          name="student"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Student Address:
              </FormControl.Label>

              <Input
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

        <Field
          name="grade"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>Grade:</FormControl.Label>

              <Input
                type="number"
                color="white"
                colorPalette="teal"
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <ButtonGroup justifyContent="center">
              <Button
                colorPalette="green"
                type="submit"
                disabled={!canSubmit}
                onClick={() => setAction("verify")}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>

              <Button
                colorPalette="red"
                type="submit"
                disabled={!canSubmit}
                onClick={() => setAction("reject")}
                mt={0}
              >
                {isSubmitting ? "Rejecting..." : "Reject"}
              </Button>
            </ButtonGroup>
          )}
        />
      </Fieldset.Root>
    </form>
  );
};
