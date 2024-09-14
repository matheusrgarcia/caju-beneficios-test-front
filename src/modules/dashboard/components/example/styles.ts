import styled from "styled-components";
import tokens from "~/modules/shared/tokens";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    display: flex;
    overflow-x: auto;
    width: 100%;
    justify-content: start;
  }
`;
