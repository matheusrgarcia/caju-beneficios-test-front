import { Card } from "@mui/material";
import styled from "styled-components";
import { LayoutContainer } from "~/modules/shared/components";
import tokens from "~/modules/shared/tokens";

export const FormCard = styled.form`
  border: 2px solid #f0f0f0;
  width: 100%;
  height: 100%;
  padding: ${tokens.space.largest};
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.regular};
  margin-top: ${tokens.space.huge};

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    width: 100%;
    border: none;
    margin-top: 0;
    padding: ${tokens.space.regular};
  }
`;

export const FormTitle = styled.h3`
  font-size: ${tokens.fontSizes.l};
  font-weight: ${tokens.fontWeights.light};
`;

export const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-self: center;
  max-width: 800px;
  width: 100%;
  gap: ${tokens.space.large};
  padding: ${tokens.space.larger};

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    height: 100%;
    box-shadow: none !important;
  }
`;

export const FormCustomContent = styled(LayoutContainer.Content)`
  gap: ${tokens.space.regular};
`;
