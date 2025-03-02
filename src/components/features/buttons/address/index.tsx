import { Button } from "@chakra-ui/react";
import { memo } from "react";

import { formatETHAddress } from "@/helpers";
import { useCopyAddress } from "@/hooks";

interface AddressButtonProps {
  address: string;
}

export const AddressButton = memo(({ address }: AddressButtonProps) => {
  const copyAddress = useCopyAddress();

  return (
    <Button
      px={0}
      color="teal.300"
      colorPalette="black"
      fontSize="sm"
      size="sm"
      variant="plain"
      fontFamily="monospace"
      onClick={() => copyAddress(address)}
      cursor="grab"
    >
      {formatETHAddress(address, { long: true })}
    </Button>
  );
});
