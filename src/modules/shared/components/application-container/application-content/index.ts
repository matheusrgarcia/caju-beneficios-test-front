import styled from "styled-components";
import tokens from "~/modules/shared/tokens";

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  gap: ${tokens.space.large};

  ${tokens.mediaQueries.s} {
    gap: ${tokens.space.regular};
  }
`;
