import {
  Box,
  Button,
  Fieldset,
  Field as FormControl,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { AssetTypeSelector } from "@/components/features";
import { DatePicker, FormFieldError, toaster } from "@/components/ui";
import { HOUR } from "@/constants";
import { ethToGwei } from "@/helpers";
import { AssetType } from "@/services";
import { auctionServiceAtom } from "@/store/atoms";

import { handleDecimalInput } from "./utils";
import { CreateAuctionFormData, createAuctionSchema } from "./validation";

export const CreateAuctionForm = () => {
  const service = useAtomValue(auctionServiceAtom);

  const width = useBreakpointValue({
    base: 250,
    sm: 300,
    md: 400,
  });

  const { Field, Subscribe, handleSubmit, reset } =
    useForm<CreateAuctionFormData>({
      defaultValues: {
        name: "",
        endTime: new Date(Date.now() + HOUR).getTime(),
        startPrice: "0",
        bidStep: "0",
        asset: null,
      },
      onSubmit: async ({ value }) => {
        if (!service) return;

        const data = {
          ...value,
          asset: value.asset as AssetType,
          startPrice: ethToGwei(Number(value.startPrice)),
          bidStep: ethToGwei(Number(value.bidStep)),
        };

        try {
          await service.createAuction(data);

          toaster.create({
            description: "Auction createed successfully",
            type: "success",
          });

          reset();
        } catch (error) {
          toaster.create({
            description: "Error createing auction",
            type: "error",
          });
        }
      },
      validators: {
        onChange: createAuctionSchema,
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
      <Fieldset.Root spaceY={4} p={4} w={width}>
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
          name="endTime"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                End Time:
              </FormControl.Label>

              <Box maxH={10}>
                <DatePicker
                  width={width}
                  value={new Date(field.state.value)}
                  onChange={(date) =>
                    date && field.handleChange(date.getTime())
                  }
                  placeholder="Select end time"
                />
              </Box>

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Field
          name="asset"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>Asset:</FormControl.Label>

              <AssetTypeSelector
                value={[field.state.value?.toString() ?? ""]}
                onChange={(values) =>
                  field.handleChange(values[0] as AssetType)
                }
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Field
          name="startPrice"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Min Bid:
              </FormControl.Label>

              <Input
                color="white"
                colorPalette="teal"
                id={field.name}
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(handleDecimalInput(event.target.value))
                }
                onBlur={field.handleBlur}
                type="text"
                inputMode="decimal"
                placeholder="0"
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Field
          name="bidStep"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Bid Step:
              </FormControl.Label>

              <Input
                color="white"
                colorPalette="teal"
                id={field.name}
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(handleDecimalInput(event.target.value))
                }
                onBlur={field.handleBlur}
                type="text"
                inputMode="decimal"
                placeholder="0"
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              fontWeight="bold"
              colorPalette="teal"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Createing Auction..." : "Create Auction"}
            </Button>
          )}
        />
      </Fieldset.Root>
    </form>
  );
};
