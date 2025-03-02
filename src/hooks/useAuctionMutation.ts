import { useAtomValue } from "jotai";
import { useCallback, useState } from "react";

import { toaster } from "@/components/ui";
import { AuctionService } from "@/services/Auction";
import { auctionServiceAtom } from "@/store/atoms";

type MutationOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage: string;
  errorMessage: string;
};

// todo: debug and use for all mutations
export const useAuctionMutation = <T>(
  method: keyof AuctionService,
  options: MutationOptions<T>
) => {
  const auctionService = useAtomValue(auctionServiceAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const mutate = useCallback(
    async (args?: any) => {
      if (!auctionService) return;

      try {
        setIsLoading(true);

        const result = await auctionService[method](args);

        if (options.onSuccess) {
          options.onSuccess(result as T);
        }

        toaster.create({
          description: options.successMessage,
          type: "success",
        });

        setData(result as T);
      } catch (error) {
        if (options.onError) {
          options.onError(error as Error);
        }

        toaster.create({
          description: options.errorMessage,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [auctionService, method, options]
  );

  return {
    mutate,
    isLoading,
    data,
  };
};
