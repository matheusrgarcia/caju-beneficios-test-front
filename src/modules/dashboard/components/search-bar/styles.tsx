import { TextField } from "@mui/material";
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

export const CpfInput = styled(TextField)`
  max-width: 300px;
`;
