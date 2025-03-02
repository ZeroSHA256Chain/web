import { Button, ButtonProps } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useCallback, useState } from "react";

import { toaster } from "@/components/ui";
import { auctionServiceAtom } from "@/store/atoms";

interface RequestWithdrawnButtonProps extends ButtonProps {
  auctionId: number;
}

export const RequestWithdrawnButton = ({
  auctionId,
  ...props
}: RequestWithdrawnButtonProps) => {
  const auctionService = useAtomValue(auctionServiceAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleClaimReward = useCallback(async () => {
    if (!auctionService) return;

    try {
      setIsLoading(true);
      await auctionService.requestWithdraw({ auctionId });

      toaster.create({
        description: "Request withdrawn successfully",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        description: "Error requesting withdrawn",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [auctionService]);

  return (
    <Button
      loading={isLoading}
      onClick={handleClaimReward}
      colorPalette="red"
      variant="solid"
      {...props}
    >
      Request Withdrawn
    </Button>
  );
};
