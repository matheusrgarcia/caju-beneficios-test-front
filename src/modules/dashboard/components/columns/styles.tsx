import styled from "styled-components";
import { RegistrationStatus, RegistrationStatusKeys } from "../../constants";
import tokens from "~/modules/shared/tokens";

const registrationStatusStyles: Record<
  RegistrationStatusKeys,
  { background: string; title: string }
> = {
  [RegistrationStatus.REVIEW]: {
    background: "#FDF8E9",
    title: "#b38206",
  },
  [RegistrationStatus.APPROVED]: {
    background: "#EEEEFD",
    title: "#4242DF",
  },
  [RegistrationStatus.REPROVED]: {
    background: "#FBEDF6",
    title: "#CE2893",
  },
};

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

    * > {
      flex: 1;
    }
  }
`;

export const Column = styled.div<{ status: RegistrationStatusKeys }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status as RegistrationStatusKeys]?.background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ status: RegistrationStatusKeys }>`
  margin: 0px;
  color: ${({ status }) =>
    registrationStatusStyles[status as RegistrationStatusKeys]?.title};
  margin: 24px;
`;

export const ColumnContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
