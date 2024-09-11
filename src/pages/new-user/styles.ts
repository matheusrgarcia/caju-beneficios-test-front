import styled from "styled-components";
import { IconButton } from "~/components/buttons/icon-button";
import { Button } from "~/components/buttons/button";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${IconButton} {
    margin-bottom: 8px;
    align-items: flex-start;
  }

  ${Button} {
    align-self: flex-end;
  }
`;
