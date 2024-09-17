import { InputBaseComponentProps } from "@mui/material";
import { Registration, RegistrationStatusKeys } from "~/modules/shared/types";

export type FormValues = Registration & {
  cpf: string;
  employeeName: string;
  admissionDate: string;
  email: string;
  id: string;
  status: RegistrationStatusKeys;
};

export interface CPFMaskInputProps extends InputBaseComponentProps {
  mask: string;
  onAccept: (value: string) => void;
  overwrite: boolean;
}
