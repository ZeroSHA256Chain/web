import { Alert } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ErrorBoundary as ErrorBoundaryComponent } from "react-error-boundary";

export const ErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundaryComponent
      fallbackRender={({ error }) => (
        <Alert.Root>
          <Alert.Title>Error occurred</Alert.Title>

          <Alert.Description>{error.message}</Alert.Description>
        </Alert.Root>
      )}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};
