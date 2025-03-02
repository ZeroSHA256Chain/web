import { z } from "zod";

import { priceString } from "@/helpers";
import { AssetType, CreateAuction } from "@/services";

export type CreateAuctionFormData = Omit<
  CreateAuction,
  "asset" | "startPrice" | "bidStep"
> & {
  asset: AssetType | null;
  startPrice: string;
  bidStep: string;
};

export const createAuctionSchema = z.object({
  name: z.string().min(1, "Auction name is required"),
  endTime: z.number().min(1, "End time is required"),
  startPrice: priceString,
  bidStep: priceString,
  asset: z
    .nativeEnum(AssetType, {
      errorMap: () => ({ message: "Asset type must be selected" }),
    })
    .refine((value) => value !== null, {
      message: "Asset type must be selected",
    }),
});
