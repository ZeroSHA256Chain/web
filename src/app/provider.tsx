import { PropsWithChildren } from "react";

import { Provider as ChakraProvider } from "@/components/ui";
import { system as themeSystem } from "@/theme";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ChakraProvider system={themeSystem}>{children}</ChakraProvider>;
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};
