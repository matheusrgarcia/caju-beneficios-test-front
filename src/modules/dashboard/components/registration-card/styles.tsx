import styled from "styled-components";
import tokens from "~/modules/shared/tokens";

export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: ${tokens.space.smaller};
  border: ${tokens.radii.s} solid ${tokens.colors.white};
  border-radius: ${tokens.radii.m};
  padding: ${tokens.space.smaller};
  background-color: ${tokens.colors.white};
  word-wrap: break-word;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
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
  gap: ${tokens.space.smaller};
  flex-wrap: wrap;
  word-wrap: break-word;
  overflow: hidden;
  max-width: 100%;
`;
