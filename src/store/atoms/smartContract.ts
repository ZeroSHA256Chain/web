import { atom } from "jotai";

import { SmartContractService } from "@/services";

export const smartContractService = atom<SmartContractService | null>(null);
