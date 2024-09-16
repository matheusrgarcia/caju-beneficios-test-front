import styled from "styled-components";

import tokens from "~/modules/shared/tokens";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${tokens.space.large};
  justify-content: center;
  margin-top: ${tokens.space.large};
  width: 100%;

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    display: flex;
    overflow-x: auto;
    width: 100%;
    justify-content: start;
    grid-gap: ${tokens.space.small};
  }
`;
