import { Address } from "web3";

import { AssetType } from "./enums";

export interface CreateAuction {
  title: string;
  assetType: AssetType;
  startPrice: number;
  bidStep: number;
  endTime: number;
  assetContract: Address; // ERC721/ERC1155/ERC20
  assetId: number; // ERC721/ERC1155
  assetAmount: number; // ERC1155/ERC20
  arbiter: Address; // Real Asset
}

export interface PlaceBid {
  auctionId: number;
  value: number;
}

export interface TakeMyBid {
  auctionId: number;
  bidId: number;
}

export type AuctionMethodArgs = {
  createAuction: CreateAuction;
  placeBid: PlaceBid;
  takeMyBid: TakeMyBid;
  approveRefund: number;
  getAuction: number;
  getBids: number;
  withdrawFees: [];
};
