import { Badge } from "@chakra-ui/react";
import { memo } from "react";

import { STATUS_MAP } from "@/constants";
import { AuctionStatus } from "@/services";

interface AuctionStatusBadgeProps {
  status: AuctionStatus;
}

export const AuctionStatusBadge = memo(
  ({ status }: AuctionStatusBadgeProps) => {
    return (
      <Badge
        colorPalette={STATUS_MAP[status].color}
        px={2}
        py={1}
        borderRadius="md"
      >
        {STATUS_MAP[status].label}
      </Badge>
    );
  }
);
