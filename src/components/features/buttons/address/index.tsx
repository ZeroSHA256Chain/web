import { Button } from "@chakra-ui/react";
import { memo } from "react";

import { formatETHAddress } from "@/helpers";
import { useCopyAddress } from "@/hooks";

interface AddressButtonProps {
  address: string;
  inline?: boolean;
}

export const AddressButton = memo(
  ({ address, inline = false }: AddressButtonProps) => {
    const copyAddress = useCopyAddress();

    return (
      <Button
        pl={inline ? 0 : 3}
        pr={inline ? 0 : 3}
        color="teal.300"
        colorPalette="black"
        fontSize="sm"
        size="sm"
        variant="ghost"
        fontFamily="monospace"
        onClick={() => copyAddress(address)}
        cursor="grab"
      >
        {formatETHAddress(address, { long: true })}
      </Button>
    );
  }
);
