import { atom } from "jotai";

import { AuctionService } from "@/services";

export const auctionServiceAtom = atom<AuctionService | null>(null);
