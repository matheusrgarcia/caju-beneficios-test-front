import { InputHTMLAttributes } from "react";
import {
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
} from "@mui/material";

type Props = MaterialTextFieldProps & {
  inputRef?: unknown;
} & InputHTMLAttributes<unknown>;

export const TextField: React.FC<Props> = ({ ...rest }) => {
  return <MaterialTextField {...rest} />;
};
