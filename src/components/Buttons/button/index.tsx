import { StyledButton } from "./styles";

export type ButtonProps = {
  variant?: "default" | "small";
  bgcolor?: string;
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  bgcolor,
  color,
  children,
  ...rest
}) => {
  return (
    <StyledButton $variant={variant} $bgcolor={bgcolor} $color={color} {...rest}>
      {children}
    </StyledButton>
  );
};
