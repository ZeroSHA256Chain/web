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

import { FormFieldError, toaster } from "@/components/ui";
import { RejectTaskDto, VerifyTaskDto } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

import { Action } from "./types";
import { ReviewTaskFormValues, reviewTaskSchema } from "./validation";

interface TaskReviewFormProps {
  projectId: number;
  studentAddress: string;
  onSuccess: () => void;
}

export const TaskReviewForm: React.FC<TaskReviewFormProps> = ({
  projectId,
  studentAddress,
  onSuccess,
}) => {
  const service = useAtomValue(smartContractServiceAtom);

  const [action, setAction] = useState<Action | null>(null);

  const { Field, Subscribe, handleSubmit } = useForm<ReviewTaskFormValues>({
    defaultValues: {
      projectId,
      student: studentAddress,
      grade: null,
    },
    onSubmit: async ({ value }) => {
      if (!service || !action) return;

      try {
        if (action === "verify") {
          if (!value.grade) {
            toaster.create({
              description: "Grade is required to verify the task",
              type: "error",
            });

            return;
          }

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

        onSuccess();
      } catch (error) {
        toaster.create({
          description: "Error reviewing task",
          type: "error",
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
          name="grade"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>Grade:</FormControl.Label>

              <Input
                type="number"
                color="white"
                colorPalette="teal"
                id={field.name}
                value={field.state.value ?? 0}
                onChange={(event) =>
                  field.handleChange(Number(event.target.value))
                }
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
                fontWeight="bold"
                colorPalette="green"
                type="submit"
                disabled={!canSubmit}
                onClick={() => setAction("verify")}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>

              <Button
                fontWeight="bold"
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
