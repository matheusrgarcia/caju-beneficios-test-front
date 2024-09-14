import { RegistrationStatus } from "~/modules/shared/constants";
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
