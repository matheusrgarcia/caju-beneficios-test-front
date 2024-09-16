import styled from "@emotion/styled";
import { Button } from "~/modules/shared/components";
import tokens from "~/modules/shared/tokens";

export const CustomButton = styled(Button)`
  height: 30px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${tokens.space.regular};
  gap: ${tokens.space.smallest};

  & > * {
    flex: 1;
    height: 52px;
    min-width: 0;
  }

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    grid-template-columns: 1fr;
  }
`;
