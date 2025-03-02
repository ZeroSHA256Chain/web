import { Button, Flex, FlexProps } from "@chakra-ui/react";
import { Field as FormControl } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { PriceInput } from "@/components/features";
import { FormFieldError, toaster } from "@/components/ui";
import { ethToGwei, extractErrorMessage } from "@/helpers";
import { auctionServiceAtom } from "@/store/atoms";

import { MakeBidFormData, makeBidSchema } from "./validation";

interface MakeBidFormProps extends FlexProps {
  auctionId: number;
}

export const MakeBidForm = ({ auctionId, ...props }: MakeBidFormProps) => {
  const service = useAtomValue(auctionServiceAtom);

  const { Field, Subscribe, handleSubmit, reset } = useForm<MakeBidFormData>({
    defaultValues: {
      price: "",
    },
    onSubmit: async ({ value }) => {
      if (!service) return;

      try {
        await service.placeBid({
          auctionId,
          value: ethToGwei(Number(value.price)),
        });

        toaster.create({
          description: "Bid placed successfully",
          type: "success",
        });

        reset();
      } catch (error: any) {
        toaster.create({
          description: extractErrorMessage(error),
          type: "error",
        });
      }
    },
    validators: {
      onChange: makeBidSchema,
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        handleSubmit();
      }}
      style={{
        width: "100%",
      }}
    >
      <Field
        name="price"
        children={(field) => (
          <FormControl.Root>
            <Flex align="center" {...props}>
              <PriceInput
                borderRightRadius="none"
                name={field.name}
                handleChange={field.handleChange}
                handleBlur={field.handleBlur}
                value={field.state.value}
              />

              <Subscribe
                selector={(state) => [state.isSubmitting]}
                children={([isSubmitting]) => (
                  <Button
                    borderLeftRadius="none"
                    fontWeight="bold"
                    variant="subtle"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Place
                  </Button>
                )}
              />
            </Flex>

            <FormFieldError state={field.state} />
          </FormControl.Root>
        )}
      />
    </form>
  );
};
