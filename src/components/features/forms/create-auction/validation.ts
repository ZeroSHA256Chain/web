import { z } from "zod";

import { CreateAuction } from "@/services";

export const createAuctionSchema = z.object({
  name: z.string().min(1, "Auction name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
}) satisfies z.ZodType<CreateAuction>;
