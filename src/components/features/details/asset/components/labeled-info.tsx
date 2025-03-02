import { HStack, Text, TextProps } from "@chakra-ui/react";

interface LabeledValueProps extends TextProps {
  label: string;
  value: string | number;
}

export const LabeledValue = ({ label, value, ...props }: LabeledValueProps) => (
  <HStack fontSize="sm">
    <Text color="fg.muted" {...props}>
      {label}:{" "}
    </Text>

    <Text fontWeight="medium" color="white" maxW={200} truncate>
      {value}
    </Text>
  </HStack>
);
