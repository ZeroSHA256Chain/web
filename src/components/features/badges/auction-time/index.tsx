import { Badge, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { memo } from "react";

import { Icon } from "@/components/ui";

interface AuctionTimeBadgeProps {
  endTime: number;
  isEnded: boolean;
}

export const AuctionTimeBadge = memo(
  ({ endTime, isEnded }: AuctionTimeBadgeProps) => {
    return (
      <Badge
        w="fit-content"
        size="lg"
        colorPalette={isEnded ? "red" : "blue"}
        variant="subtle"
        px={2}
        py={1}
      >
        <Icon height="1rem" width="1rem" name="CalendarClock" />

        <Text as="span">
          {isEnded ? "Ended " : "Ends "}
          {formatDistance(Number(endTime), Date.now(), {
            addSuffix: true,
          })}
        </Text>
      </Badge>
    );
  }
);
