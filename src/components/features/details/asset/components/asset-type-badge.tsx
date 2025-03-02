import { Badge, BadgeProps } from "@chakra-ui/react";

export const AssetTypeBadge = ({ title, ...props }: BadgeProps) => (
  <Badge
    alignSelf="end"
    colorPalette="black"
    variant="outline"
    fontWeight="bold"
    px={2}
    py={1}
    mb={2}
    {...props}
  >
    {title}
  </Badge>
);
