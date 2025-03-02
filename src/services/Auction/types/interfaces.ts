import { Address } from "web3";

import { AssetType, AuctionStatus } from "./enums";

export interface RealAsset {
  arbiter: Address;
}

export interface ERC20Asset {
  amount: bigint;
  tokenContract: Address;
}

export interface ERC721Asset {
  id: bigint;
  tokenContract: Address;
}

export interface ERC1155Asset {
  id: bigint;
  amount: bigint;
  tokenContract: Address;
}

export interface Bid {
  id: number;
  sender: Address;
  price: number;
  date: number;
  withdrawn: boolean;
}

export interface Asset {
  kind: AssetType;
  real?: RealAsset;
  erc20?: ERC20Asset;
  erc721?: ERC721Asset;
  erc1155?: ERC1155Asset;
}

export interface Auction {
  id: number;
  title: string;
  creator: Address;
  bidsCount: number;
  endTime: number;
  startPrice: number;
  bidStep: number;
  bestBid: Bid | null;
  asset: Asset;
  status: AuctionStatus;
}
