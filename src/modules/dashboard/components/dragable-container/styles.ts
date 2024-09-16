import styled from "styled-components";

import { RegistrationStatusKeys } from "~/modules/shared/types";
import tokens from "~/modules/shared/tokens";

import { registrationStatusStyles } from "../../constants";

export const DragContainer = styled.div<{ status: RegistrationStatusKeys }>`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.small};
  height: auto;
  overflow: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status as RegistrationStatusKeys]?.background};
  border-radius: ${tokens.space.small};
  min-height: 80dvh;
  max-height: 80dvh;
  padding: ${tokens.space.regular};

  @media screen and (max-width: ${tokens.breakpoints.s}) {
    min-width: 90%;
    padding: ${tokens.space.smaller};
  }
`;

export const TitleColumn = styled.h3<{ status: RegistrationStatusKeys }>`
  margin: ${tokens.space.small};
  color: ${({ status }) =>
    registrationStatusStyles[status as RegistrationStatusKeys]?.title};
`;
