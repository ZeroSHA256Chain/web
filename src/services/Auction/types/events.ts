import { Address } from "web3";

export interface AuctionCreatedEvent {
  auctionId: bigint;
  creator: Address;
}

export interface BidPlacedEvent {
  auctionId: bigint;
  bidder: Address;
  amount: bigint;
}

export interface AuctionFinalizedEvent {
  auctionId: bigint;
  winner: Address;
  finalPrice: bigint;
}

export interface ArbiterSetEvent {
  auctionId: bigint;
  arbiter: Address;
}
