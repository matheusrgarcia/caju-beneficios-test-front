import { InputHTMLAttributes } from "react";
import { Input } from "./styles";

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<unknown>;

export const TextField: React.FC<Props> = (props, { id, label, error }) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <Input {...props} />
      {/* TODO: Change styles to file */}
      <span style={{ fontSize: 12, color: "red" }}>{error}</span>
    </div>
  );
};
