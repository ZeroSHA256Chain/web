import { Address } from "web3";

import { HOUR } from "@/constants";
import { ethToGwei } from "@/helpers";
import { AssetType, Auction, AuctionStatus } from "@/services";

import { mockBids } from "./bids_list";

export const mockAuction: Auction = {
  name: "Rare Digital Artwork Collection",
  creator: "0x9012345678901234567890123456789012345678" as Address,
  bidsCount: BigInt(mockBids.length),
  endTime: BigInt(Date.now() + HOUR * 48), // Ends in 48 hours
  startPrice: BigInt(ethToGwei(1.0)), // 1.0 ETH
  bidStep: BigInt(ethToGwei(0.1)), // 0.1 ETH
  bestBid: mockBids[0], // Latest bid from mockBids
  status: AuctionStatus.Active,
  arbiter: "0xAB12345678901234567890123456789012345678" as Address,

  // Example with ERC721 asset (NFT)
  asset: {
    kind: AssetType.ERC721,
    erc721: {
      id: BigInt(1337),
      tokenContract: "0xCD12345678901234567890123456789012345678" as Address,
    },
  },
};

export const assetExamples = {
  real: {
    kind: AssetType.Real,
    real: {
      description: "Authentic Vintage Watch - Limited Edition",
      arbiter: "0xAB12345678901234567890123456789012345678" as Address,
      approves: {
        ["0x9012345678901234567890123456789012345678" as Address]: true,
        ["0xAB12345678901234567890123456789012345678" as Address]: true,
      },
    },
  },

  erc20: {
    kind: AssetType.ERC20,
    erc20: {
      amount: BigInt(5000000000000000000), // 5.0 tokens
      tokenContract: "0xCD12345678901234567890123456789012345678" as Address,
    },
  },

  erc1155: {
    kind: AssetType.ERC1155,
    erc1155: {
      id: BigInt(42),
      amount: BigInt(5), // 5 copies
      tokenContract: "0xCD12345678901234567890123456789012345678" as Address,
    },
  },
};
