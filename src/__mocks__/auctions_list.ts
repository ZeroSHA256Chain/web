import { Address } from "web3";

import { ethToGwei } from "@/helpers";
import { AuctionStatus, ShortAuction } from "@/services";

export const mockAuctions: ShortAuction[] = [
  {
    id: 1,
    name: "Vintage Art Collection",
    bestBid: ethToGwei(1.5),
    bidStep: ethToGwei(0.1),
    status: AuctionStatus.Active,
    endTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    creator: "0x1234567890123456789012345678901234567890" as Address,
  },
  {
    id: 2,
    name: "Rare NFT Bundle",
    bestBid: ethToGwei(2.8),
    bidStep: ethToGwei(0.2),
    status: AuctionStatus.Active,
    endTime: Date.now() + 12 * 60 * 60 * 1000, // 12 hours from now
    creator: "0x2345678901234567890123456789012345678901" as Address,
  },
  {
    id: 3,
    name: "Digital Art Collection",
    bestBid: ethToGwei(0.5),
    bidStep: ethToGwei(0.05),
    status: AuctionStatus.Ended,
    endTime: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    creator: "0x3456789012345678901234567890123456789012" as Address,
  },
  {
    id: 4,
    name: "Gaming Assets Pack",
    bestBid: ethToGwei(3.2),
    bidStep: ethToGwei(0.25),
    status: AuctionStatus.Active,
    endTime: Date.now() + 36 * 60 * 60 * 1000, // 36 hours from now
    creator: "0x4567890123456789012345678901234567890123" as Address,
  },
  {
    id: 5,
    name: "Crypto Punk #1337",
    bestBid: ethToGwei(15.0),
    bidStep: ethToGwei(1.0),
    status: AuctionStatus.WaitFinalization,
    endTime: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
    creator: "0x5678901234567890123456789012345678901234" as Address,
  },
  {
    id: 6,
    name: "Virtual Land Plot",
    bestBid: ethToGwei(4.7),
    bidStep: ethToGwei(0.3),
    status: AuctionStatus.Active,
    endTime: Date.now() + 48 * 60 * 60 * 1000, // 48 hours from now
    creator: "0x6789012345678901234567890123456789012345" as Address,
  },
  {
    id: 7,
    name: "Metaverse Wearables",
    bestBid: ethToGwei(0.8),
    bidStep: ethToGwei(0.1),
    status: AuctionStatus.Declined,
    endTime: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
    creator: "0x7890123456789012345678901234567890123456" as Address,
  },
  {
    id: 8,
    name: "Digital Real Estate",
    bestBid: ethToGwei(7.5),
    bidStep: ethToGwei(0.5),
    status: AuctionStatus.Active,
    endTime: Date.now() + 72 * 60 * 60 * 1000, // 72 hours from now
    creator: "0x8901234567890123456789012345678901234567" as Address,
  },
  {
    id: 9,
    name: "Collectible Cards Set",
    bestBid: ethToGwei(1.2),
    bidStep: ethToGwei(0.15),
    status: AuctionStatus.Active,
    endTime: Date.now() + 6 * 60 * 60 * 1000, // 6 hours from now
    creator: "0x9012345678901234567890123456789012345678" as Address,
  },
  {
    id: 10,
    name: "3D Model Collection",
    bestBid: ethToGwei(2.3),
    bidStep: ethToGwei(0.2),
    status: AuctionStatus.Active,
    endTime: Date.now() + 18 * 60 * 60 * 1000, // 18 hours from now
    creator: "0x0123456789012345678901234567890123456789" as Address,
  },
];
