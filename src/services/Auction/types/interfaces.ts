import { Address } from "web3";

import { AssetType, AuctionStatus } from "./enums";

export interface RealAsset {
  description: string;
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
  id: bigint;
  sender: Address;
  price: bigint;
  date: bigint;
}

export interface Asset {
  kind: AssetType;
  real?: RealAsset;
  erc20?: ERC20Asset;
  erc721?: ERC721Asset;
  erc1155?: ERC1155Asset;
}

export interface Auction {
  name: string;
  creator: Address;
  bidsCount: bigint;
  endTime: bigint;
  startPrice: bigint;
  bidStep: bigint;
  bestBid: Bid;
  asset: Asset;
  status: AuctionStatus;
  arbiter: Address;
}

export interface CreateAuction {
  name: string;
  endTime: number;
  startPrice: number;
  bidStep: number;
  asset: AssetType;
}

export interface ShortAuction {
  id: number;
  name: string;
  bestBid: number;
  bidStep: number;
  status: AuctionStatus;
  endTime: number;
  creator: Address;
}
