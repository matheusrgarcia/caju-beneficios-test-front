export const HEADER_HEIGHT = "48px";

export const REGISTRATION_MUTATION_KEYS = {
  create: "create-registration-mutation",
  get: "get-registration-mutation",
  update: "update-registration-mutation",
  delete: "delete-registration-mutation",
} as const;

export const REGISTRATION_QUERY_KEYS = {
  getRegistrations: "getRegistrations",
} as const;

export const DEFAULT_QUERY_STALE_TIME = 60000;

export const RegistrationStatus = {
  REVIEW: "REVIEW",
  APPROVED: "APPROVED",
  REPROVED: "REPROVED",
} as const;

