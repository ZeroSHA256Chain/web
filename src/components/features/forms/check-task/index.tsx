import { Button, Fieldset, Field as FormControl } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { FormFieldError, toaster } from "@/components/ui";
import { smartContractServiceAtom } from "@/store/atoms";

import { CheckTaskFormValues, checkTaskSchema } from "./validation";

interface CheckTaskFormProps {
  onSuccess: () => void;
}

export const CheckTaskForm: React.FC<CheckTaskFormProps> = ({ onSuccess }) => {
  const service = useAtomValue(smartContractServiceAtom);

  const { Field, Subscribe, handleSubmit } = useForm<CheckTaskFormValues>({
    defaultValues: {
      projectId: null,
      student: null,
    },
    onSubmit: async ({ value }) => {
      const projectId = value.projectId;
      const student = value.student;

      if (!service || !projectId || !student) return;

      try {
        await service.getSubmission({
          projectId,
          student,
        });

        onSuccess();
      } catch (error) {
        toaster.create({
          description: "Error checking task",
          type: "error",
        });
      }
    },
    validators: {
      onChange: checkTaskSchema,
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
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              fontWeight="bold"
              colorPalette="green"
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? "Checking..." : "Check"}
            </Button>
          )}
        />
      </Fieldset.Root>
    </form>
  );
};
