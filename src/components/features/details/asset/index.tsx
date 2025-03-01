import { StackProps, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { P, match } from "ts-pattern";

import { formatETHAddress, gweiToETH } from "@/helpers";
import { AssetType, Auction } from "@/services";

interface AssetDetailsProps extends StackProps {
  asset: Auction["asset"];
}

export const AssetDetails: React.FC<AssetDetailsProps> = memo(
  ({ asset, ...props }) => {
    return (
      <VStack align="start" spaceY={2} {...props}>
        {match(asset)
          .with(
            P.intersection({ kind: AssetType.Real, real: P.nonNullable }),
            ({ real }) => (
              <>
                <Text fontWeight="bold">Real Asset</Text>
                <Text>Description: {real.description}</Text>
                <Text>Arbiter: {formatETHAddress(real.arbiter)}</Text>
                <Text>
                  Approvals:{" "}
                  {Object.values(real.approves).filter(Boolean).length}
                </Text>
              </>
            )
          )
          .with(
            P.intersection({ kind: AssetType.ERC20, erc20: P.nonNullable }),
            ({ erc20 }) => (
              <>
                <Text fontWeight="bold">ERC20 Token</Text>
                <Text>Amount: {gweiToETH(Number(erc20.amount))}</Text>
                <Text>Contract: {formatETHAddress(erc20.tokenContract)}</Text>
              </>
            )
          )
          .with(
            P.intersection({ kind: AssetType.ERC721, erc721: P.nonNullable }),
            ({ erc721 }) => (
              <>
                <Text fontWeight="bold">NFT (ERC721)</Text>
                <Text>Token ID: {erc721.id.toString()}</Text>
                <Text>Contract: {formatETHAddress(erc721.tokenContract)}</Text>
              </>
            )
          )
          .with(
            P.intersection({ kind: AssetType.ERC1155, erc1155: P.nonNullable }),
            ({ erc1155 }) => (
              <>
                <Text fontWeight="bold">NFT (ERC1155)</Text>
                <Text>Token ID: {erc1155.id.toString()}</Text>
                <Text>Amount: {erc1155.amount.toString()}</Text>
                <Text>Contract: {formatETHAddress(erc1155.tokenContract)}</Text>
              </>
            )
          )
          .with(
            P.intersection({ kind: AssetType.ERC721, erc721: P.nonNullable }),
            ({ erc721 }) => (
              <>
                <Text fontWeight="bold">NFT (ERC721)</Text>
                <Text>Token ID: {erc721.id.toString()}</Text>
                <Text>Contract: {formatETHAddress(erc721.tokenContract)}</Text>
              </>
            )
          )
          .otherwise(() => null)}
      </VStack>
    );
  }
);
