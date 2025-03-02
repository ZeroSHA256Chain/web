import { HStack, Text } from "@chakra-ui/react";
import { Address } from "web3";

import { AddressButton } from "@/components/features";

interface AddressInfoProps {
  address: Address;
  ownerLabel: string;
}

export const AddressInfo = ({ address, ownerLabel }: AddressInfoProps) => (
  <HStack gap={1}>
    <Text color="fg.muted">{ownerLabel}:</Text>

    <AddressButton address={address} />
  </HStack>
);
