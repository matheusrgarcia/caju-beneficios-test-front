import { RegistrationStatus, RegistrationStatusKeys } from "~/modules/shared/constants";
import { GetRegistrationsResponse } from "~/modules/shared/types";

// TODO: Change type?
export type DashboardColumns = {
  registrations: GetRegistrationsResponse; // TODO: Should change this
};

export const dashboardColumnItems = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];

export const dashboardColumnTitles = {
  [RegistrationStatus.REVIEW]: "Pronto para revisar",
  [RegistrationStatus.APPROVED]: "Aprovado",
  [RegistrationStatus.REPROVED]: "Reprovado",
};

export const registrationStatusStyles: Record<
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