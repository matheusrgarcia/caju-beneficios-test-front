import styled from "styled-components";
import { HEADER_HEIGHT } from "../../constants";
import tokens from "../../tokens";

export const AppContainer = styled.div<{ $centralized?: boolean }>`
  margin-top: ${HEADER_HEIGHT};
  display: flex;
  flex-direction: column;
  padding: ${tokens.space.large};
  height: 100%;
  align-items: ${({ $centralized }) => $centralized && "center"};

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    padding: ${tokens.space.smaller};
  }
`;
