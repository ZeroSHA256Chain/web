import { Address } from "web3";

import { AssetType } from "./enums";

export interface CreateAuctionParams {
  title: string;
  assetType: AssetType;
  startPrice: number;
  bidStep: number;
  endTime: number;
  assetContract: Address;
  assetId: number;
  assetAmount: number;
  arbiter: Address;
}

export interface PlaceBidParams {
  auctionId: number;
  value: number;
}

export interface TakeMyBidParams {
  auctionId: number;
  bidId: number;
}

export interface VerifyNewArbiterParams {
  auctionId: number;
  newArbiter: Address;
}

export type AuctionMethodArgs = {
  createAuction: CreateAuctionParams;
  placeBid: PlaceBidParams;
  takeMyBid: TakeMyBidParams;
  verifyNewArbiter: VerifyNewArbiterParams;
  approveRefund: number;
  getAuction: number;
  getBids: number;
  withdrawFees: [];
};
