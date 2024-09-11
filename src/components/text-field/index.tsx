import { InputHTMLAttributes } from "react";
import { Input } from "./styles";

type Props = {
  label?: string;
  error?: string;
  inputRef?: unknown;
} & InputHTMLAttributes<unknown>;

export const TextField: React.FC<Props> = ({ id, label, error, ...rest }) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <Input {...rest} />
      {/* TODO: Change styles to file */}
      <span style={{ fontSize: 12, color: "red" }}>{error}</span>
    </div>
  );
};
