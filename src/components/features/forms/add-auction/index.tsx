import {
  Button,
  Fieldset,
  Field as FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { FormFieldError, toaster } from "@/components/ui";
import { CreateAuction } from "@/services";
import { auctionServiceAtom } from "@/store/atoms";

import { addAuctionSchema } from "./validation";

interface AddAuctionFormProps {
  onSuccess: () => void;
}

export const AddAuctionForm: React.FC<AddAuctionFormProps> = ({
  onSuccess,
}) => {
  const service = useAtomValue(auctionServiceAtom);

  const { Field, Subscribe, handleSubmit, reset } = useForm<CreateAuction>({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      if (!service) return;

      try {
        await service.createAuction(value);

        reset();

        toaster.create({
          description: "Auction added successfully",
          type: "success",
        });

        onSuccess();
      } catch (error) {
        toaster.create({
          description: "Error adding auction",
          type: "error",
        });
      }
    },
    validators: {
      onChange: addAuctionSchema,
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
                Auction Name:
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

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              fontWeight="bold"
              colorPalette="teal"
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? "Adding Auction..." : "Add Auction"}
            </Button>
          )}
        />
      </Fieldset.Root>
    </form>
  );
};
