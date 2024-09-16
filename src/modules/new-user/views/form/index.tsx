import * as React from "react";
import { IMaskInput } from "react-imask";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { LayoutContainer, TextField } from "~/modules/shared/components";
import { Registration, RegistrationStatusKeys } from "~/modules/shared/types";

import { useCreateRegistrationMutation } from "../../mutations/use-create-registration-mutation";

import * as S from "./styles";
import { InputBaseComponentProps } from "@mui/material";

type FormValues = Registration & {
  cpf: string;
  employeeName: string;
  admissionDate: string;
  email: string;
  id: string;
  status: RegistrationStatusKeys;
};

interface CPFMaskInputProps extends InputBaseComponentProps {
  mask: string;
  onAccept: (value: string) => void;
  overwrite: boolean;
}

const CPFMaskInput = React.forwardRef<HTMLInputElement, CPFMaskInputProps>(
  function CPFMaskInput(props, ref) {
    const { mask, onAccept, overwrite, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        onAccept={onAccept}
        overwrite={overwrite}
        inputRef={ref as React.Ref<HTMLInputElement>} // Ensure the correct ref type
      />
    );
  }
);

export const NewRegistrationForm: React.FC = () => {
  const createRegistration = useCreateRegistrationMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: Registration) => {
    createRegistration.mutate(data);
  };

  return (
    <S.FormCard onSubmit={handleSubmit(onSubmit)}>
      <LayoutContainer centralized>
        <LayoutContainer.Content>
          <TextField
            placeholder="Nome"
            label="Nome"
            {...register("employeeName", { required: "Nome é requerido" })}
            error={!!errors.employeeName}
            helperText={errors.employeeName ? errors.employeeName.message : ""}
            required
          />

          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email inválido",
              },
            })}
            required
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />

          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CPF"
                variant="outlined"
                fullWidth
                required
                value={field.value}
                slotProps={{
                  input: {
                    inputComponent: CPFMaskInput,
                    inputProps: {
                      mask: "000.000.000-00",
                      onAccept: (value: string) => {
                        setValue("cpf", value);
                        field.onChange(value);
                      },
                      overwrite: true,
                    },
                  },
                }}
                {...register("cpf", { required: "CPF é requerido" })}
                error={!!errors.cpf}
                helperText={errors.cpf ? errors.cpf.message : ""}
                placeholder="Digite um CPF válido"
              />
            )}
          />

          <Controller
            name="admissionDate"
            control={control}
            defaultValue=""
            rules={{ required: "É necessário cadastrar uma Data de admissão" }}
            render={({ field }) => (
              <DatePicker
                label="Data de admissão"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) =>
                  field.onChange(
                    newValue ? dayjs(newValue).format("DD/MM/YYYY") : ""
                  )
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.admissionDate,
                    helperText: errors.admissionDate
                      ? errors.admissionDate.message
                      : "",
                  },
                }}
              />
            )}
          />
        </LayoutContainer.Content>
        <LayoutContainer.Footer>
          <LayoutContainer.Footer.ContinueButton type="submit" />
        </LayoutContainer.Footer>
      </LayoutContainer>
    </S.FormCard>
  );
};
