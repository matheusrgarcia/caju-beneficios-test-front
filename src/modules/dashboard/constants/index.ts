import { GetRegistrationsResponse } from "~/modules/shared/types";

// TODO: Change type
export type DashboardColumns = {
  registrations: GetRegistrationsResponse; // TODO: Should change this
};

export const DEFAULT_QUERY_STALE_TIME = 60000;

export const RegistrationStatus = {
  REVIEW: "REVIEW",
  APPROVED: "APPROVED",
  REPROVED: "REPROVED",
} as const;

export type RegistrationStatusKeys = keyof typeof RegistrationStatus;

export const dashboardColumnItems = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];

export const REGISTRATION_MUTATION_KEYS = {
  update: "update-registration-mutation",
  delete: "delete-registration-mutation",
} as const;

export const REGISTRATION_QUERY_KEYS = {
  getRegistrations: "getRegistrations",
} as const;

export type Registration = {
  employeeName: string;
  admissionDate: string;
  email: string;
  id: string;
  status: RegistrationStatusKeys;
};
