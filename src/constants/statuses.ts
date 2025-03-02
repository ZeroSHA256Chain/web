import { AuctionStatus } from "@/services";

export const STATUS_MAP = {
  [AuctionStatus.Active]: { color: "green", label: "Active" },
  [AuctionStatus.Ended]: { color: "gray", label: "Ended" },
  [AuctionStatus.Declined]: { color: "red", label: "Declined" },
  [AuctionStatus.WaitFinalization]: {
    color: "orange",
    label: "Finalization",
  },
} as const;
