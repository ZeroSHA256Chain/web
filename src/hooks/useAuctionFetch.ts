import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";

import { auctionServiceAtom } from "@/store/atoms";

type FetchMethod = "getAuction" | "getAuctions" | "getBids";

interface UseAuctionFetchOptions {
  method: FetchMethod;
  args?: {
    id: number;
  };
}

export const useAuctionFetch = <T>({
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
          const methodToCall = auctionService[method].bind(auctionService);

          let result: T;

          if (methodToCall.length > 0 && args) {
            result = (await methodToCall(args.id)) as T;
          } else {
            result = (await (methodToCall as () => Promise<T>)()) as T;
          }

          setData(result);
        } catch (error) {
          console.error({ error });
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
