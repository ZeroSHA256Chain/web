import Web3, { AbiFragment, Contract } from "web3";
import { AbiItem } from "web3-utils";

export type CallMethods = "createAuction" | "makeBid";
export type QueryMethods =
  | "getAuction"
  | "getBids"
  // todo: remove
  | "_getMockBids"
  | "_getMockAuction";

export class SmartContractRepository {
  private web3: Web3;
  private contract: Contract<AbiFragment[]>;

  constructor(
    provider: string,
    contractAddress: string,
    abi: AbiItem[],
    private account: string
  ) {
    this.web3 = new Web3(provider);
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
  }

  protected async call(
    methodName: CallMethods,
    args: unknown[],
    options: { value?: string } = {}
  ) {
    return await this.contract.methods[methodName](...args).send({
      from: this.account,
      ...options,
    });
  }

  protected async query<T>(
    methodName: QueryMethods,
    args: unknown[] = []
  ): Promise<T> {
    return await this.contract.methods[methodName](...args).call();
  }
}
