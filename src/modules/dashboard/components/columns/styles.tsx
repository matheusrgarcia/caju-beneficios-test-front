import styled from "styled-components";
import { RegistrationStatus } from "../../constants";

type RegistrationStatusKeys = keyof typeof RegistrationStatus;

const registrationStatusStyles: Record<
  RegistrationStatus,
  { background: string; title: string }
> = {
  [RegistrationStatus.REVIEW]: {
    background: "#FDF8E9",
    title: "#EFC24D",
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
`;

export const Column = styled.div<{ status: RegistrationStatusKeys }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status as unknown as RegistrationStatus]?.background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ status: RegistrationStatusKeys }>`
  margin: 0px;
  color: ${({ status }) => registrationStatusStyles[status as unknown as RegistrationStatus]?.title};
  margin: 24px;
`;

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
