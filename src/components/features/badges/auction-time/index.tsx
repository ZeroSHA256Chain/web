import { Badge, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { memo, useMemo } from "react";

import { Icon } from "@/components/ui";

interface AuctionTimeBadgeProps {
  endTime: number;
}

export const AuctionTimeBadge = memo(({ endTime }: AuctionTimeBadgeProps) => {
  const isEnded = useMemo(() => endTime < Date.now(), [endTime]);

  return (
    <Badge
      w="fit-content"
      size="md"
      colorPalette={isEnded ? "red" : "blue"}
      variant="solid"
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
});
