import { IMaskInput } from "react-imask";
import styled from "styled-components";
import tokens from "~/modules/shared/tokens";

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${tokens.space.regular};

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    gap: 0;
  }
`;

export const CpfInput = styled(IMaskInput)`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;
