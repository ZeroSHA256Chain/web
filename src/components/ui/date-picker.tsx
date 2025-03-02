import { Button } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import BaseDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { HOUR } from "@/constants";

interface DatePickerProps {
  onChange: (date: Date | null) => void;
  value: Date;
  placeholder: string;
  width?: string | number;
}

interface CustomCalendarInputProps {
  value?: string;
  onClick?: () => void;
  width?: string | number;
}

const CustomCalendarInput = forwardRef<
  HTMLButtonElement,
  CustomCalendarInputProps
>((props, ref) => (
  <Button
    ref={ref}
    onClick={props.onClick}
    colorPalette="black"
    variant="outline"
    w={props.width}
  >
    {props.value || "Select date"}
  </Button>
));

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  value,
  placeholder,
  width,
}) => {
  return (
    <BaseDatePicker
      selected={value}
      onChange={onChange}
      minDate={new Date(Date.now() + HOUR)}
      placeholderText={placeholder}
      customInput={<CustomCalendarInput width={width} />}
    />
  );
};
