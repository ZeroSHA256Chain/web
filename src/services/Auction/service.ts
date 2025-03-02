import { mockAuction } from "@/__mocks__/auction";
import { mockBids } from "@/__mocks__/bids_list";
import { SmartContractRepository } from "@/blockchain";

import { Auction, Bid, CreateAuction } from "./types";

export class AuctionService extends SmartContractRepository {
  public async createAuction(data: CreateAuction) {
    await this.call("createAuction", [data]);
  }

  public async getAuction(id: number) {
    return await this.query<Auction>("getAuction", [id]);
  }

  public async _getMockAuction(_id: number) {
    return Promise.resolve(mockAuction);
  }

  public async getBids(id: number) {
    return await this.query<Bid[]>("getBids", [id]);
  }

  public async _getMockBids(_id: number) {
    return Promise.resolve(mockBids);
  }

  public async makeBid(id: number, price: number) {
    await this.call("makeBid", [id, price]);
  }
}

export * from "./types";
