"use client";

import { ChakraProvider, SystemContext, defaultSystem } from "@chakra-ui/react";

interface ProviderProps {
  system: SystemContext;
  children: React.ReactNode;
}
export const Provider: React.FC<ProviderProps> = ({
  system = defaultSystem,
  children,
}) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};
