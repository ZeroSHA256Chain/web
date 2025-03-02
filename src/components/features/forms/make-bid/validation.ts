import { ZodType, z } from "zod";

import { priceString } from "@/helpers";

export interface MakeBidFormData {
  price: string;
}

export const makeBidSchema = z.object({
  price: priceString,
}) satisfies ZodType<MakeBidFormData>;
