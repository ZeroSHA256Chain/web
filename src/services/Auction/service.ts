import { SmartContractRepository } from "@/blockchain";

import { CreateAuction } from "./types";

export class AuctionService extends SmartContractRepository {
  async createAuction({ name, description }: CreateAuction) {
    await this.call("createAuction", [name, description]);
  }

  async getAuction(id: number) {
    return await this.query("getAuction", [id]);
  }
}

export * from "./types";
