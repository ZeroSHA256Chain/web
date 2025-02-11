import { atom } from "jotai";

import { SmartContractService } from "@/services";

export const smartContractServiceAtom = atom<SmartContractService | null>(null);
