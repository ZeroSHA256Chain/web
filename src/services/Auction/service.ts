import { mockAuction } from "@/__mocks__/auction";
import { mockBids } from "@/__mocks__/bids_list";
import { SmartContractRepository } from "@/blockchain";

import {
  Auction,
  AuctionMethodArgs,
  Bid,
  PlaceBid,
  TakeMyBid,
  VerifyNewArbiter,
} from "./types";

export class AuctionService extends SmartContractRepository {
  public async createAuction(params: AuctionMethodArgs["createAuction"]) {
    const orderedParams = [
      params.title,
      params.assetType,
      params.startPrice,
      params.bidStep,
      params.endTime,
      params.assetContract,
      params.assetId,
      params.assetAmount,
      params.arbiter,
    ];

    await this.call("createAuction", orderedParams);
  }

  public async placeBid({ auctionId, value }: PlaceBid) {
    await this.call<AuctionMethodArgs["placeBid"]>("placeBid", [
      {
        auctionId,
        value,
      },
    ]);
  }

  public async takeMyBid({ auctionId, bidId }: TakeMyBid) {
    await this.call<AuctionMethodArgs["takeMyBid"]>("takeMyBid", [
      { auctionId, bidId },
    ]);
  }

  public async verifyNewArbiter({ auctionId, newArbiter }: VerifyNewArbiter) {
    await this.call<AuctionMethodArgs["verifyNewArbiter"]>("verifyNewArbiter", [
      { auctionId, newArbiter },
    ]);
  }

  public async approveRefund(auctionId: number) {
    await this.call<AuctionMethodArgs["approveRefund"]>("approveRefund", [
      auctionId,
    ]);
  }

  public async getAuction(id: number) {
    return await this.query<Auction>("getAuction", [id]);
  }

  public async getBids(id: number) {
    return await this.query<Bid[]>("getBids", [id]);
  }

  public async withdrawFees() {
    await this.call<AuctionMethodArgs["withdrawFees"]>("withdrawFees", []);
  }

  // mock methods for development
  public async _getMockAuction(_id: number) {
    return Promise.resolve(mockAuction);
  }

  public async _getMockBids(_id: number) {
    return Promise.resolve(mockBids);
  }
}

export * from "./types";
