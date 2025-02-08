import { PropsWithChildren } from "react";

import { Provider as ChakraProvider } from "@/components/ui";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ChakraProvider>{children}</ChakraProvider>

      {/* <TanStackRouterDevtools /> */}
    </>
  );
};
