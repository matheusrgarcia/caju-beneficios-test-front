import styled from "styled-components";
import tokens from "~/modules/shared/tokens";

export const FormCard = styled.form`
  border: 2px solid #f0f0f0;
  width: 100%;
  height: 100%;
  padding: ${tokens.space.largest};
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: ${tokens.space.huge};

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    width: 100%;
    border: none;
    padding: ${tokens.space.regular};
  }
`;
