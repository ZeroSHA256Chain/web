import {
  Badge,
  Button,
  Fieldset,
  Field as FormControl,
  HStack,
  Input,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";
import { useState } from "react";

import { ProjectSelect } from "@/components/features";
import { FormFieldError, toaster } from "@/components/ui";
import { formatLongString } from "@/helpers";
import { Submission } from "@/services";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

import { CheckTaskFormValues, checkTaskSchema } from "./validation";

interface CheckTaskFormProps {}

export const CheckTaskForm: React.FC<CheckTaskFormProps> = () => {
  const service = useAtomValue(smartContractServiceAtom);
  const projects = useAtomValue(projectsAtom);

  const [submission, setSubmission] = useState<Submission | null>(null);

  const { Field, Subscribe, handleSubmit } = useForm<CheckTaskFormValues>({
    defaultValues: {
      projectId: null,
      student: null,
    },
    onSubmit: async ({ value }) => {
      const projectId = value.projectId;
      const student = value.student;

      if (
        !service ||
        typeof projectId !== "number" ||
        typeof student !== "string"
      )
        return;

      setSubmission(null);

      try {
        setSubmission(
          await service.getSubmission({
            projectId,
            student,
          })
        );

        toaster.create({
          description: "Submission loaded successfully",
          type: "success",
        });
      } catch (error) {
        toaster.create({
          description: "Error loading submission",
          type: "error",
        });
      }
    },
    validators: {
      onChange: checkTaskSchema,
    },
  });

  return (
    <>
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
                  value={field.state.value ?? ""}
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

      <Show when={Boolean(submission)}>
        <VStack
          spaceY={2}
          align="start"
          p={4}
          borderRadius="md"
          bg="gray.900"
          color="white"
        >
          <Show when={submission?.isRejected}>
            <HStack>
              <Badge colorPalette="red">Rejected</Badge>
            </HStack>
          </Show>

          <Show when={submission?.isVerified}>
            <HStack>
              <Text as="span" fontWeight="semibold">
                Grade:
              </Text>

              <Text>{submission?.grade}</Text>
            </HStack>
          </Show>

          <HStack>
            <Text as="span" fontWeight="semibold">
              Task Hash:
            </Text>

            <Button
              h={7}
              variant="subtle"
              colorPalette="blue"
              onClick={async () => {
                if (!submission?.taskHash) return;

                await navigator.clipboard.writeText(submission.taskHash);

                toaster.create({
                  title: "Copied to clipboard",
                  description: "Task hash copied",
                  type: "success",
                });
              }}
            >
              {formatLongString(submission?.taskHash ?? "")}
            </Button>
          </HStack>
        </VStack>
      </Show>
    </>
  );
};
