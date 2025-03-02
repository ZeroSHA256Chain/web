import { Input, InputProps } from "@chakra-ui/react";
import { memo } from "react";

import { handleDecimalInput } from "./utils";

interface PriceInputProps extends InputProps {
  name: string;
  handleChange: (value: string) => void;
  handleBlur: () => void;
  value: string;
}

export const PriceInput = memo(
  ({ name, handleChange, handleBlur, value, ...props }: PriceInputProps) => {
    return (
      <Input
        {...props}
        color="white"
        colorPalette="teal"
        id={name}
        value={value}
        onChange={(event) =>
          handleChange(handleDecimalInput(event.target.value))
        }
        onBlur={handleBlur}
        type="text"
        inputMode="decimal"
        placeholder="0"
        w="full"
      />
    );
  }
);
