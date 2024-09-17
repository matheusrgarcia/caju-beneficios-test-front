import styled from "styled-components";
import tokens from "~/modules/shared/tokens";
import { Button } from "../../buttons/button";

import { LoadingButton } from "@mui/lab";

export const BottomBar = styled.div`
  display: flex;
  bottom: 0;
  position: fixed;
  width: 100%;
  border-top: 1px solid ${tokens.colors.grayLight};
  background-color: ${tokens.colors.white};
`;

export const BackButton = styled(Button).attrs({
  variant: "outlined",
  type: "button",
})``;

export const FooterButton = styled(LoadingButton)`
  margin-left: auto;

  ${tokens.mediaQueries.s} {
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 920px;
  padding: ${tokens.space.regular} ${tokens.space.large};
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  gap: ${tokens.space.regular};

  &:has(${BackButton}) > ${FooterButton} {
    width: auto;
  }
`;
