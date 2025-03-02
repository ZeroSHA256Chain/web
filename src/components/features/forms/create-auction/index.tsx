import {
  Box,
  Button,
  Fieldset,
  Field as FormControl,
  Grid,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";

import { AssetTypeSelector, PriceInput } from "@/components/features";
import { DatePicker, FormFieldError, toaster } from "@/components/ui";
import {
  AssetTypeLabel,
  ETHEREUM_TOKEN,
  HOUR,
  LABEL_TO_ASSET_TYPE,
  ZERO_ADDRESS,
} from "@/constants";
import { ethToGwei } from "@/helpers";
import { auctionServiceAtom } from "@/store/atoms";

import { CreateAuctionFormData, createAuctionSchema } from "./validation";

export const CreateAuctionForm = () => {
  const service = useAtomValue(auctionServiceAtom);

  const width = useBreakpointValue({
    base: 250,
    sm: 400,
    md: 700,
  });

  const { Field, Subscribe, handleSubmit, reset } =
    useForm<CreateAuctionFormData>({
      defaultValues: {
        title: "",
        endTime: new Date(Date.now() + HOUR).getTime(),
        startPrice: "0",
        bidStep: "0",
        assetType: null,
        assetContract: "",
        assetId: 0,
        assetAmount: 0,
        arbiter: "",
      },
      onSubmit: async ({ value }) => {
        if (!service || !value.assetType) return;

        const data = {
          ...value,
          assetType: LABEL_TO_ASSET_TYPE[value.assetType],
          startPrice: ethToGwei(Number(value.startPrice)),
          bidStep: ethToGwei(Number(value.bidStep)),
          assetContract: value.assetContract || ZERO_ADDRESS,
          assetId: value.assetId || 0,
          assetAmount: value.assetAmount || 0,
          arbiter: value.arbiter || ZERO_ADDRESS,
        };

        try {
          await service.createAuction(data);

          toaster.create({
            description: "Auction createed successfully",
            type: "success",
          });

          reset();
        } catch (error: any) {
          toaster.create({
            title: "Please check your inputs",
            description: error.cause.message,
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
          name="title"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Auction Title:
              </FormControl.Label>

              <Input
                color="white"
                colorPalette="teal"
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter auction title"
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
          name="assetType"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label htmlFor={field.name}>
                Asset Type:
              </FormControl.Label>

              <AssetTypeSelector
                value={[field.state.value?.toString() ?? ""]}
                onChange={(values) =>
                  field.handleChange(values[0] as AssetTypeLabel)
                }
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
          }}
          gap={4}
        >
          <Field
            name="startPrice"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  {`Min Bid(${ETHEREUM_TOKEN}):`}
                </FormControl.Label>

                <PriceInput
                  name={field.name}
                  handleChange={field.handleChange}
                  handleBlur={field.handleBlur}
                  value={field.state.value}
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
                  {`Bid Step(${ETHEREUM_TOKEN}):`}
                </FormControl.Label>

                <PriceInput
                  name={field.name}
                  handleChange={field.handleChange}
                  handleBlur={field.handleBlur}
                  value={field.state.value}
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="assetContract"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Asset Contract(optional):
                </FormControl.Label>

                <Input
                  color="white"
                  colorPalette="teal"
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter asset contract"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="arbiter"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Arbiter(optional):
                </FormControl.Label>

                <Input
                  color="white"
                  colorPalette="teal"
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter arbiter address"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="assetId"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Asset ID(optional):
                </FormControl.Label>

                <Input
                  color="white"
                  colorPalette="teal"
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  onBlur={field.handleBlur}
                  placeholder="Enter asset id"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="assetAmount"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Asset Amount(optional):
                </FormControl.Label>

                <Input
                  color="white"
                  colorPalette="teal"
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  onBlur={field.handleBlur}
                  placeholder="Enter asset amount"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />
        </Grid>

        <Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              fontWeight="bold"
              colorPalette="teal"
              type="submit"
              loading={isSubmitting}
            >
              Create Auction
            </Button>
          )}
        />
      </Fieldset.Root>
    </form>
  );
};
