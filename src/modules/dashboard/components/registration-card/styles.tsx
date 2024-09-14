import styled from "styled-components";
import tokens from "~/modules/shared/tokens";

export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: ${tokens.space.small};
  border-radius: 8px;
  padding: ${tokens.space.smaller};
  background-color: #fff;
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const DeleteContainer = styled.div`
  display: flex;
  align-self: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: ${tokens.space.regular};
  display: flex;
  /* grid-template-columns: 1fr 1fr 2fr; */
  align-items: center;
  gap: 4px;

  & > * {
    flex: 1;
    height: 52px;
    min-width: 0;
  }

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    grid-template-columns: 1fr;
  }
`;
