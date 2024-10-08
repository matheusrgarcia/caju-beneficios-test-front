import * as React from "react";
import { IMaskInput } from "react-imask";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { LayoutContainer, TextField } from "~/modules/shared/components";
import { Registration } from "~/modules/shared/types";
import { isValidCPF } from "~/modules/shared/utils/cpf-utils";
import { useModal } from "~/modules/shared/contexts";

import { useCreateRegistrationMutation } from "../../mutations/use-create-registration-mutation";
import { CPFMaskInputProps, FormValues } from "../../types";

import * as S from "./styles";
import { CPF_MASK } from "~/modules/shared/constants";

const CPFMaskInput = React.forwardRef<HTMLInputElement, CPFMaskInputProps>(
  function CPFMaskInput(props, ref) {
    const { mask, onAccept, overwrite, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        onAccept={onAccept}
        overwrite={overwrite}
        inputRef={ref as React.Ref<HTMLInputElement>}
      />
    );
  }
);

export const NewRegistrationForm: React.FC = () => {
  const { mutate, isPending } = useCreateRegistrationMutation();
  const { openModal } = useModal();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    shouldFocusError: false,
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data: Registration) => {
    openModal({
      title: "Confirmar cadastro de registro",
      message: `Deseja realmente salvar este registro?`,
      onConfirm: () => mutate(data),
    });
  };

  return (
    <S.FormCard onSubmit={handleSubmit(onSubmit)}>
      <LayoutContainer centralized>
        <LayoutContainer.Content>
          <S.FormTitle>Cadastro de Registro</S.FormTitle>
          <TextField
            placeholder="Nome"
            label="Nome"
            {...register("employeeName", {
              required: "Nome é requerido",
              validate: {
                hasAtLeastTwoLettersInFirstName: (value) => {
                  const [firstName] = value.trim().split(/\s+/);

                  return (
                    firstName.length >= 2 ||
                    "O primeiro nome deve ter pelo menos duas letras."
                  );
                },
                hasSecondNameWithAtLeastOneChar: (value) => {
                  const names = value.trim().split(/\s+/);
                  return (
                    (names.length > 1 && names[1].length >= 1) ||
                    "O sobrenome deve ter pelo menos um caractere."
                  );
                },
                hasSpace: (value) =>
                  /\s/.test(value) ||
                  "O nome deve conter pelo menos um espaço.",
                startsWithLetter: (value) =>
                  /^[^\d]/.test(value) ||
                  "O nome não pode começar com um número.",
              },
            })}
            error={!!errors.employeeName}
            helperText={errors.employeeName ? errors.employeeName.message : ""}
          />

          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            {...register("email", {
              required: "Email é requerido",
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
            rules={{
              required: "CPF é requerido",
              validate: (value) => isValidCPF(value) || "CPF inválido",
            }}
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
                      mask: CPF_MASK,
                      onAccept: (value: string) => {
                        setValue("cpf", value);
                        field.onChange(value);
                      },
                      overwrite: true,
                    },
                  },
                }}
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
            rules={{
              required: "É necessário cadastrar uma Data de admissão",
              validate: (value) => {
                const isValidDate = dayjs(value, "DD/MM/YYYY", true).isValid();
                return isValidDate || "Data inválida";
              },
            }}
            render={({ field }) => (
              <DatePicker
                name="admissionDate"
                label="Data de admissão*"
                value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                onChange={(newValue) =>
                  field.onChange(
                    newValue ? dayjs(newValue).format("DD/MM/YYYY") : ""
                  )
                }
                format="DD/MM/YYYY"
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
          <LayoutContainer.Footer.ContinueButton
            type="submit"
            loading={isPending}
          />
        </LayoutContainer.Footer>
      </LayoutContainer>
    </S.FormCard>
  );
};
