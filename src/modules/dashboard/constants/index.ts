import { GetRegistrationsResponse } from "~/modules/shared/types";

// TODO: Change type
export type DashboardColumns = {
  registrations: GetRegistrationsResponse; // TODO: Should change this
};

export const DEFAULT_QUERY_STALE_TIME = 60000;

export const RegistrationStatus = {
  REVIEW: "REVIEW",
  APPROVED: "APPROVED",
  REPROVED: "REPROVED"
} as const;

// TODO: Maybe add INTL? Lets see if there's enough time to do this
export const dashboardColumnItems = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];
