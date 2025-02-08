"use client";

import { ChakraProvider, SystemContext, defaultSystem } from "@chakra-ui/react";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

interface ProviderProps {
  system: SystemContext;
  colorMode?: ColorModeProviderProps;
  children: React.ReactNode;
}
export const Provider: React.FC<ProviderProps> = ({
  system = defaultSystem,
  colorMode,
  children,
}) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...colorMode} />

      {children}
    </ChakraProvider>
  );
};
