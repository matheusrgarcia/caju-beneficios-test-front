import { Ref, forwardRef } from "react";
import {
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
} from "@mui/material";

export const TextField = forwardRef<HTMLInputElement, MaterialTextFieldProps>(
  (props: object, ref: Ref<unknown> | undefined) => {
    return <MaterialTextField {...props} inputRef={ref} />;
  }
);

TextField.displayName = "TextField";
