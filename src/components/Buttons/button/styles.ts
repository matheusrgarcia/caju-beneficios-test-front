import styled from "styled-components";

// TODO: Should check all this
// ADD enum to variants
// Maybe set variable for sizes, lets see
export const StyledButton = styled.button<{
  $variant?: "default" | "small";
  $bgcolor?: string;
  $color?: string;
}>`
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: ${({ $variant }) => ($variant === "small" ? "4px" : "36px")};
  padding: ${({ $variant }) => ($variant === "small" ? "4px 16px" : "8px 32px")};
  background-color: ${({ $bgcolor, $variant }) =>
    $bgcolor ?? ($variant === "small" ? "none" : "#64a98c")};
  color: ${({ $color, $variant }) =>
    $color ?? ($variant === "small" ? "#000" : "#fff")};
  font-size: ${({ $variant }) => ($variant === "small" ? "12px" : "16px")};
  font-weight: 600;
  display: flex;
  align-items: center;
  height: ${({ $variant }) => ($variant === "small" ? "auto" : "56px")};
  box-shadow: ${({ $variant }) =>
    $variant === "default" ? "rgba(149, 157, 165, 0.2) 0px 8px 24px" : "none"};
`;
