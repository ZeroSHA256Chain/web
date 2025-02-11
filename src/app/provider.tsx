import { PropsWithChildren } from "react";

import { Provider as ChakraProvider, Toaster } from "@/components/ui";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider>
      <Toaster />

      {children}
    </ChakraProvider>
  );
};
