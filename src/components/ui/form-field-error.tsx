import { Em, Show } from "@chakra-ui/react";
import { FieldState } from "@tanstack/react-form";

interface FieldInfoProps<TData extends unknown> {
  state: FieldState<TData>;
}

export const FormFieldError = <TData extends unknown>({
  state,
}: FieldInfoProps<TData>) => {
  return (
    <Show when={state.meta.isTouched && state.meta.errors.length}>
      <Em fontSize="xs" color="red.500">
        {state.meta.errors.join(", ")}
      </Em>
    </Show>
  );
};
