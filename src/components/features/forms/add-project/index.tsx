import {
  Button,
  Fieldset,
  Field as FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { Checkbox, DatePicker, FormFieldError, toaster } from "@/components/ui";
import { SECOND } from "@/constants";
import { CreateProjectDto } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

import { addProjectSchema } from "./validation";

export const AddProjectForm: React.FC = () => {
  const service = useAtomValue(smartContractServiceAtom);

  const { Field, Subscribe, handleSubmit, reset } = useForm<CreateProjectDto>({
    defaultValues: {
      name: "",
      description: "",
      deadline: Math.floor(Date.now() / SECOND),
      allowResubmission: false,
      verifiers: [],
      allowedStudents: [],
    },
    onSubmit: async ({ value }) => {
      if (!service) return;

      await service.createProject(value);

      reset();

      toaster.create({
        description: "Project added successfully",
        type: "success",
      });
    },
    validators: {
      onChange: addProjectSchema,
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
          name="name"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Project Name:
              </FormControl.Label>

              <Input
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

        <Field
          name="description"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Description:
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

        <Field
          name="deadline"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Deadline:
              </FormControl.Label>

              <DatePicker
                value={new Date(field.state.value * 1000)}
                onChange={(date) =>
                  field.handleChange(
                    Math.floor((date?.getTime() || Date.now()) / 1000)
                  )
                }
                placeholder="Select deadline"
              />

              <FormFieldError field={field} />
            </FormControl.Root>
          )}
        />

        <Field
          name="allowResubmission"
          children={(field) => (
            <FormControl.Root>
              <Checkbox
                color="white"
                colorPalette="teal"
                checked={field.state.value}
                onChange={(event) =>
                  field.handleChange((event.target as HTMLInputElement).checked)
                }
                onBlur={field.handleBlur}
              >
                Allow Resubmission
              </Checkbox>

              <FormFieldError field={field} />
            </FormControl.Root>
          )}
        />

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button colorPalette="teal" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Adding Project..." : "Add Project"}
            </Button>
          )}
        />
      </Fieldset.Root>
    </form>
  );
};
