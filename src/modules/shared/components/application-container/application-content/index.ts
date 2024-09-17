import styled from "styled-components";
import tokens from "~/modules/shared/tokens";

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  gap: ${tokens.space.large};

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    height: 100%;
    gap: 0;
  }
`;
