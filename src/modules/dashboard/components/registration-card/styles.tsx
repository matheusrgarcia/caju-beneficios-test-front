import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const Delete = styled.button`
  display: flex;
  align-self: flex-end;
  position: absolute;
  cursor: pointer;
  background: none;
  border: none;

  svg {
    width: 16px;
    height: 24px;
  }
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    cursor: pointer;
  }
`;
