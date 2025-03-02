import { Address } from "web3";

import { AssetType } from "./enums";

interface CreateAuction {
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

interface PlaceBid {
  auctionId: number;
  value: number;
}

interface TakeMyBid {
  auctionId: number;
  bidId: number;
}

interface RequestWithdraw {
  auctionId: number;
}

export type AuctionMethodArgs = {
  createAuction: CreateAuction;
  placeBid: PlaceBid;
  takeMyBid: TakeMyBid;
  requestWithdraw: RequestWithdraw;
  getAuction: number;
  getBids: number;
};
