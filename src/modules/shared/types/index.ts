import { RegistrationStatusKeys } from "../constants";

type Registration = {
  admissionDate: string; // TODO: maybe date? later change it makes sense
  email: string;
  employeeName: string;
  status: RegistrationStatusKeys;
  cpf: string;
  id: string;
};

export type GetRegistrationsResponse = Registration[];
