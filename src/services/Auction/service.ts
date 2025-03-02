import { SmartContractRepository } from "@/blockchain";

import { Auction, AuctionMethodArgs, Bid } from "./types";
import { parseAuction } from "./utils";

export class AuctionService extends SmartContractRepository {
  public async createAuction(params: AuctionMethodArgs["createAuction"]) {
    await this.call("createAuction", [
      params.title,
      params.assetType,
      params.startPrice,
      params.bidStep,
      params.endTime,
      params.assetContract,
      params.assetId,
      params.assetAmount,
      params.arbiter,
    ]);
  }

  public async placeBid(params: AuctionMethodArgs["placeBid"]) {
    await this.call("placeBid", [params.auctionId, params.value]);
  }

  public async takeMyBid(params: AuctionMethodArgs["takeMyBid"]) {
    await this.call("takeMyBid", [params.auctionId, params.bidId]);
  }

  public async requestWithdraw(params: AuctionMethodArgs["requestWithdraw"]) {
    await this.call("requestWithdraw", [params.auctionId]);
  }

  public async getAuctionCount(): Promise<number> {
    return await this.query<number>("auctionCount");
  }

  public async getAuction(id: number): Promise<Auction> {
    return parseAuction(await this.query<Auction>("getAuction", [id]));
  }

  public async getAuctions(): Promise<Auction[]> {
    const count = await this.getAuctionCount();

    const auctions = await Promise.all(
      Array.from({ length: Number(count) }, (_, id) => this.getAuction(id))
    );

    return auctions.map((auction, index) => ({
      ...auction,
      id: index,
    }));
  }

  public async getBids(auctionId: number): Promise<Bid[]> {
    const bidsCount = (await this.getAuction(auctionId)).bidsCount;

    const bids = await Promise.all(
      Array.from({ length: Number(bidsCount) }, (_, id) =>
        this.query<Bid>("bids", [auctionId, id])
      )
    );

    return bids.map((bid, index) => ({
      ...bid,
      id: index,
    }));
  }
}

export * from "./types";
