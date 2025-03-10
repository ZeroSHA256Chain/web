import { Center, Skeleton, Text } from "@chakra-ui/react";
import { match } from "ts-pattern";

import { ErrorAlert } from "@/components/features";

interface LoadedContentControllerProps<T extends object> {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string;
  emptyMessage: string;
  children: (data: T) => React.ReactNode;
  data: T | null;
}

export const LoadedContentController = <T extends object>({
  isLoading,
  errorMessage,
  emptyMessage,
  children,
  isEmpty,
  isError,
  data,
}: LoadedContentControllerProps<T>) => {
  return match({ isLoading, isEmpty, isError })
    .with({ isLoading: true }, () => (
      <Center h="full" w="full">
        <Skeleton />
      </Center>
    ))
    .with({ isEmpty: true }, () => (
      <Text fontSize="lg" color="fg.muted">
        {emptyMessage}
      </Text>
    ))
    .with({ isError: true }, () => (
      <ErrorAlert title="Error" description={errorMessage} />
    ))
    .when(
      () => data !== null,
      () => children(data as T)
    )
    .otherwise(() => null);
};
