import { mockAuction } from "@/__mocks__/auction";
import { mockBids } from "@/__mocks__/bids_list";
import { SmartContractRepository } from "@/blockchain";

import {
  Auction,
  AuctionMethodArgs,
  Bid,
  CreateAuctionParams,
  PlaceBidParams,
  TakeMyBidParams,
  VerifyNewArbiterParams,
} from "./types";

export class AuctionService extends SmartContractRepository {
  public async createAuction(params: CreateAuctionParams) {
    await this.call<AuctionMethodArgs["createAuction"]>("createAuction", [
      params,
    ]);
  }

  public async placeBid({ auctionId, value }: PlaceBidParams) {
    await this.call<AuctionMethodArgs["placeBid"]>("placeBid", [
      {
        auctionId,
        value,
      },
    ]);
  }

  public async takeMyBid({ auctionId, bidId }: TakeMyBidParams) {
    await this.call<AuctionMethodArgs["takeMyBid"]>("takeMyBid", [
      { auctionId, bidId },
    ]);
  }

  public async verifyNewArbiter({
    auctionId,
    newArbiter,
  }: VerifyNewArbiterParams) {
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
