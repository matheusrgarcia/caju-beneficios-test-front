import { Button as MaterialButton, ButtonProps as MaterialButtonProps } from "@mui/material";

export type ButtonProps = MaterialButtonProps & {
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <MaterialButton {...rest}>{children}</MaterialButton>;
};
