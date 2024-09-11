import { GetRegistrationsResponse } from "~/modules/shared/types";

// TODO: Change type
export type DashboardColumns = {
  registrations: GetRegistrationsResponse; // TODO: Should change this
};

export const DEFAULT_QUERY_STALE_TIME = 60000;

export enum RegistrationStatus {
  "REVIEW",
  "APPROVED",
  "REPROVED",
}
