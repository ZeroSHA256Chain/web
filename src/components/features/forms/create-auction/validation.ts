import { z } from "zod";

import {
  ASSET_TYPE_LABELS,
  AssetTypeLabel,
  ETHEREUM_ADDRESS_PATTERN,
} from "@/constants";
import { priceString } from "@/helpers";
import { AuctionMethodArgs } from "@/services";

export type CreateAuctionFormData = Omit<
  AuctionMethodArgs["createAuction"],
  | "assetType"
  | "startPrice"
  | "bidStep"
  | "assetContract"
  | "assetId"
  | "assetAmount"
  | "arbiter"
> & {
  assetType: AssetTypeLabel | null;
  startPrice: string;
  bidStep: string;
  assetContract?: string;
  assetId?: number;
  assetAmount?: number;
  arbiter?: string;
};

const ethereumAddress = z
  .string()
  .refine(
    (address) => address.match(ETHEREUM_ADDRESS_PATTERN) || address === "",
    "Must be a valid Ethereum address"
  )
  .optional();

export const createAuctionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assetType: z
    .enum(ASSET_TYPE_LABELS, {
      errorMap: () => ({ message: "Please select a valid asset type" }),
    })
    .nullable(),
  startPrice: priceString,
  bidStep: priceString,
  endTime: z.number().min(Date.now(), "End time must be in the future"),
  assetContract: ethereumAddress.optional(),
  assetId: z.number().optional(),
  assetAmount: z.number().optional(),
  arbiter: ethereumAddress.optional(),
});
