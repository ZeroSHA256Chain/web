import React from "react";
import BaseDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  onChange: (date: Date | null) => void;
  value: Date;
  placeholder: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  return (
    <BaseDatePicker
      selected={value}
      onChange={onChange}
      minDate={new Date()}
      placeholderText={placeholder}
    />
  );
};
