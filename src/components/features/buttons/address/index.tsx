import { Button } from "@chakra-ui/react";
import { memo } from "react";

import { formatETHAddress } from "@/helpers";
import { useCopyAddress } from "@/hooks";

export const AddressButton = memo(({ address }: { address: string }) => {
  const copyAddress = useCopyAddress();

  return (
    <Button
      color="teal.300"
      colorPalette="black"
      fontSize="sm"
      size="sm"
      variant="ghost"
      fontFamily="monospace"
      onClick={() => copyAddress(address)}
    >
      {formatETHAddress(address, { long: true })}
    </Button>
  );
});
