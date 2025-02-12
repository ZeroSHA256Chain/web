import {
  Button,
  Fieldset,
  Field as FormControl,
  HStack,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import {
  Checkbox,
  DatePicker,
  FormFieldError,
  Icon,
  toaster,
} from "@/components/ui";
import { CreateProjectDto } from "@/services";
import { smartContractServiceAtom } from "@/store/atoms";

import { addProjectSchema } from "./validation";

interface AddProjectFormProps {
  onSuccess: () => void;
}

export const AddProjectForm: React.FC<AddProjectFormProps> = ({
  onSuccess,
}) => {
  const service = useAtomValue(smartContractServiceAtom);

  const { Field, Subscribe, handleSubmit, reset } = useForm<CreateProjectDto>({
    defaultValues: {
      name: "",
      description: "",
      deadline: Date.now(),
      allowResubmission: false,
      verifiers: [],
      allowedStudents: [],
    },
    onSubmit: async ({ value }) => {
      if (!service) return;

      try {
        await service.createProject(value);

        reset();

        toaster.create({
          description: "Project added successfully",
          type: "success",
        });

        onSuccess();
      } catch (error) {
        toaster.create({
          description: "Error adding project",
          type: "error",
        });
      }
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

              <FormFieldError state={field.state} />
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

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Field
          name="verifiers"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label>Verifiers:</FormControl.Label>

              {field.state.value.map((verifier: string, index: number) => (
                <HStack key={index} mb={2}>
                  <Input
                    color="white"
                    colorPalette="teal"
                    value={verifier}
                    onChange={(event) => {
                      const newVerifiers = [...field.state.value];

                      newVerifiers[index] = event.target.value;

                      field.handleChange(newVerifiers);
                    }}
                  />

                  <IconButton
                    minW={6}
                    h={6}
                    aria-label="Remove verifier"
                    colorPalette="red"
                    onClick={() => {
                      const newVerifiers = field.state.value.filter(
                        (_, _index) => _index !== index
                      );

                      field.handleChange(newVerifiers);
                    }}
                  >
                    <Icon name="Trash" />
                  </IconButton>
                </HStack>
              ))}

              <IconButton
                minW={6}
                h={6}
                aria-label="Add verifier"
                colorPalette="green"
                onClick={() => {
                  field.handleChange([...field.state.value, ""]);
                }}
                mb={2}
              >
                <Icon name="Plus" />
              </IconButton>

              <FormFieldError state={field.state} />
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
                value={new Date(field.state.value)}
                onChange={(date) =>
                  field.handleChange(date?.getTime() || Date.now())
                }
                placeholder="Select deadline"
              />

              <FormFieldError state={field.state} />
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

              <FormFieldError state={field.state} />
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
