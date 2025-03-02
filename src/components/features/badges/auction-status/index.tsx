import { Badge, BadgeProps } from "@chakra-ui/react";
import { memo } from "react";

import { STATUS_MAP } from "@/constants";
import { AuctionStatus } from "@/services";

interface AuctionStatusBadgeProps extends BadgeProps {
  status: AuctionStatus;
}

export const AuctionStatusBadge = memo(
  ({ status, ...props }: AuctionStatusBadgeProps) => {
    return (
      <Badge
        colorPalette={STATUS_MAP[status].color}
        px={2}
        py={1}
        borderRadius="md"
        size="lg"
        {...props}
      >
        {STATUS_MAP[status].label}
      </Badge>
    );
  }
);
