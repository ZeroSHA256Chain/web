import { useCallback } from "react";

import { toaster } from "@/components/ui";

export const useCopyAddress = () =>
  useCallback(async (address: string | null) => {
    if (!address) return;

    await navigator.clipboard.writeText(address);

    toaster.create({
      title: "Copied to clipboard",
      description: "Address has been copied to clipboard",
      type: "success",
    });
  }, []);
