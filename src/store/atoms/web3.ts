import { atom } from "jotai";
import Web3 from "web3";

export const web3Atom = atom<Web3 | null>(null);

export const connectedAccountAtom = atom<string | null>(null);
