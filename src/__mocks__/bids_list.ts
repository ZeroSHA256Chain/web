import { Address } from "web3";

import { ethToGwei } from "@/helpers";
import { Bid } from "@/services";

const HOUR = 3600000;

export const mockBids: Bid[] = [
  {
    id: BigInt(1),
    sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" as Address,
    price: BigInt(ethToGwei(2.5)), // 2.5 ETH - winning bid
    date: BigInt(Date.now() - HOUR * 1), // 1 hour ago
  },
  {
    id: BigInt(2),
    sender: "0x2345678901234567890123456789012345678901" as Address,
    price: BigInt(ethToGwei(2.3)), // 2.3 ETH
    date: BigInt(Date.now() - HOUR * 2), // 2 hours ago
  },
  {
    id: BigInt(3),
    sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" as Address,
    price: BigInt(ethToGwei(2.1)), // 2.1 ETH
    date: BigInt(Date.now() - HOUR * 3), // 3 hours ago
  },
  {
    id: BigInt(4),
    sender: "0x4567890123456789012345678901234567890123" as Address,
    price: BigInt(ethToGwei(2.0)), // 2.0 ETH
    date: BigInt(Date.now() - HOUR * 5), // 5 hours ago
  },
  {
    id: BigInt(5),
    sender: "0x5678901234567890123456789012345678901234" as Address,
    price: BigInt(ethToGwei(1.8)), // 1.8 ETH
    date: BigInt(Date.now() - HOUR * 6), // 6 hours ago
  },
  {
    id: BigInt(6),
    sender: "0x6789012345678901234567890123456789012345" as Address,
    price: BigInt(ethToGwei(1.5)), // 1.5 ETH
    date: BigInt(Date.now() - HOUR * 8), // 8 hours ago
  },
  {
    id: BigInt(7),
    sender: "0x7890123456789012345678901234567890123456" as Address,
    price: BigInt(ethToGwei(1.2)), // 1.2 ETH
    date: BigInt(Date.now() - HOUR * 12), // 12 hours ago
  },
  {
    id: BigInt(8),
    sender: "0x8901234567890123456789012345678901234567" as Address,
    price: BigInt(ethToGwei(1.0)), // 1.0 ETH - starting bid
    date: BigInt(Date.now() - HOUR * 24), // 24 hours ago
  },
];
