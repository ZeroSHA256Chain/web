import { Address } from "web3";

import { AssetType, Auction, AuctionStatus, Bid } from "./types";

export const parseAsset = (rawAsset: any) => {
  const kind = Number(rawAsset[0]) as AssetType;
  const details = rawAsset[1];

  switch (kind) {
    case AssetType.Real:
      return {
        kind,
        real: {
          description: details.description,
          arbiter: details.arbiter as Address,
          approves: details.approves,
        },
      };
    case AssetType.ERC20:
      return {
        kind,
        erc20: {
          tokenContract: details.tokenContract as Address,
          amount: details.amount.toString(),
        },
      };
    case AssetType.ERC721:
      return {
        kind,
        erc721: {
          tokenContract: details.tokenContract as Address,
          id: BigInt(details.id),
        },
      };
    case AssetType.ERC1155:
      return {
        kind,
        erc1155: {
          tokenContract: details.tokenContract as Address,
          id: BigInt(details.id),
          amount: BigInt(details.amount),
        },
      };
  }
};

export const parseBid = (rawBid: any): Bid => ({
  id: Number(rawBid[0]),
  sender: rawBid[1] as Address,
  price: Number(rawBid[2]),
  date: Number(rawBid[3]),
  withdrawn: rawBid[4],
});

export const parseAuction = (rawAuction: any): Auction => {
  const data = Array.isArray(rawAuction) ? rawAuction[0] : rawAuction;

  return {
    id: Number(data.id),
    title: data.title,
    creator: data.creator as Address,
    startPrice: Number(data.startPrice),
    bidStep: Number(data.bidStep),
    endTime: Number(data.endTime),
    status: Number(data.status) as unknown as AuctionStatus,
    bidsCount: Number(data.bidsCount),
    asset: parseAsset(data.asset),
    bestBid: data.bestBid ? parseBid(data.bestBid) : null,
  };
};
