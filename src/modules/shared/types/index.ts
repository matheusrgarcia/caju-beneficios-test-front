import { RegistrationStatus } from "../constants";

export type GetRegistrationsResponse = Registration[];

export type RegistrationStatusKeys = keyof typeof RegistrationStatus;

export type Registration = {
  employeeName: string;
  admissionDate: string;
  email: string;
  id: string;
  status: RegistrationStatusKeys;
};
