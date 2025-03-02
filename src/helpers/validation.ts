import { z } from "zod";

export const priceString = z
  .string()
  .min(1, "Price is required")
  .refine((value) => {
    return /^\d*\.?\d*$/.test(value);
  }, "Must be a valid number")
  .refine((value) => {
    const number = Number(value);
    return !Number.isNaN(number) && number > 0;
  }, "Must be a positive number");
