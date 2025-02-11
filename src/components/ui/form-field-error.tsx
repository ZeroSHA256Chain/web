import { Em, Show } from "@chakra-ui/react";
import { FieldApi } from "@tanstack/react-form";

interface FieldInfoProps {
  field: FieldApi<any, any, any, any>;
}

export const FormFieldError: React.FC<FieldInfoProps> = ({ field }) => {
  return (
    <Show when={field.state.meta.isTouched && field.state.meta.errors.length}>
      <Em fontSize="xs" color="red.500">
        {field.state.meta.errors.join(", ")}
      </Em>
    </Show>
  );
};
