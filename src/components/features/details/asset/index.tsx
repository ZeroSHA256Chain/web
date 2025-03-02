import { StackProps, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { P, match } from "ts-pattern";

import { gweiToETH } from "@/helpers";
import { AssetType, Auction } from "@/services";

import { AddressInfo, AssetTypeBadge, LabeledValue } from "./components";

interface AssetDetailsProps extends StackProps {
  asset: Auction["asset"];
}

export const AssetDetails: React.FC<AssetDetailsProps> = memo(
  ({ asset, ...props }) => {
    return (
      <VStack align="start" spaceY={0} {...props}>
        {match(asset)
          .with(
            P.intersection({ kind: AssetType.Real, real: P.nonNullable }),
            ({ real }) => (
              <>
                <AssetTypeBadge title="Real Asset" />
                <AddressInfo address={real.arbiter} ownerLabel="Arbiter" />
              </>
            )
          )
          .with(
            P.intersection({ kind: AssetType.ERC20, erc20: P.nonNullable }),
            ({ erc20 }) => (
              <>
                <AssetTypeBadge title="ERC20 Token" />
                <LabeledValue
                  label="Amount"
                  value={gweiToETH(Number(erc20.amount))}
                />
                <AddressInfo
                  address={erc20.tokenContract}
                  ownerLabel="Contract"
                />
              </>
            )
          )
          .with(
            P.intersection({ kind: AssetType.ERC721, erc721: P.nonNullable }),
            ({ erc721 }) => (
              <>
                <AssetTypeBadge title="NFT (ERC721)" />
                <LabeledValue label="Token ID" value={erc721.id.toString()} />
                <AddressInfo
                  address={erc721.tokenContract}
                  ownerLabel="Contract"
                />
              </>
            )
          )
          .with(
            P.intersection({ kind: AssetType.ERC1155, erc1155: P.nonNullable }),
            ({ erc1155 }) => (
              <>
                <AssetTypeBadge title="NFT (ERC1155)" />
                <LabeledValue label="Token ID" value={erc1155.id.toString()} />
                <LabeledValue
                  label="Amount"
                  value={erc1155.amount.toString()}
                />
                <AddressInfo
                  address={erc1155.tokenContract}
                  ownerLabel="Contract"
                />
              </>
            )
          )
          .otherwise(() => null)}
      </VStack>
    );
  }
);
