import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";

import { QueryMethods } from "@/blockchain";
import { Auction, Bid } from "@/services";
import { auctionServiceAtom } from "@/store/atoms";

interface UseAuctionFetchOptions {
  method: QueryMethods;
  args: {
    id: number;
  };
}

export const useAuctionFetch = <T extends Auction | Bid[]>({
  method,
  args,
}: UseAuctionFetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const auctionService = useAtomValue(auctionServiceAtom);

  useEffect(
    function fetchData() {
      (async () => {
        if (!auctionService) return;

        try {
          setData((await auctionService[method](args.id)) as T);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
          setIsFetched(true);
        }
      })();
    },
    [auctionService, method, args]
  );

  return useMemo(
    () => ({ data, isLoading, error, isFetched, isError: Boolean(error) }),
    [data, isLoading, error, isFetched]
  );
};
