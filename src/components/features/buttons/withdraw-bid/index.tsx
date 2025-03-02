import { Button, ButtonProps } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { memo, useCallback, useState } from "react";

import { toaster } from "@/components/ui";
import { auctionServiceAtom } from "@/store/atoms";

interface WithdrawBidButtonProps extends ButtonProps {
  auctionId: number;
  bidId: number;
}

export const WithdrawBidButton = memo(
  ({ auctionId, bidId, ...props }: WithdrawBidButtonProps) => {
    const auctionService = useAtomValue(auctionServiceAtom);
    const [isLoading, setIsLoading] = useState(false);

    const handleClaimReward = useCallback(async () => {
      if (!auctionService) return;

      try {
        setIsLoading(true);

        await auctionService.takeMyBid({ auctionId, bidId });

        toaster.create({
          description: "Your bid has been withdrawn",
          type: "success",
        });
      } catch (error) {
        toaster.create({
          description: "Error withdrawing your bid",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }, [auctionService]);

    return (
      <Button
        colorPalette="red"
        variant="subtle"
        loading={isLoading}
        onClick={handleClaimReward}
        {...props}
      >
        Withdraw Bid
      </Button>
    );
  }
);
