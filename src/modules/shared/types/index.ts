import { RegistrationStatus } from "~/modules/dashboard/constants";

type Registration = {
  admissionDate: string; // TODO: maybe date? later change it makes sense
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
  id: string;
};

export type GetRegistrationsResponse = Registration[];
