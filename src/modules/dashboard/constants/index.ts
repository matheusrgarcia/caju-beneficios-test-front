import { RegistrationStatus } from "~/modules/shared/constants";

import {
  GetRegistrationsResponse,
  RegistrationStatusKeys,
} from "~/modules/shared/types";

export type DashboardColumns = {
  registrations: GetRegistrationsResponse;
};

export const dashboardStatusTitles = {
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

export const containerStatusMap: Record<string, RegistrationStatusKeys> = {
  reviewRoot: RegistrationStatus.REVIEW,
  approvedRoot: RegistrationStatus.APPROVED,
  reprovedRoot: RegistrationStatus.REPROVED,
};
