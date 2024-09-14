import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as React from "react";
import routes from "~/router/routes";
import * as S from "./styles";
import { IconButton } from "~/modules/shared/components/buttons/icon-button";
import { TextField } from "~/modules/shared/components/text-field";
import { Button } from "~/modules/shared/components/buttons/button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useCreateRegistrationMutation } from "../../mutations/use-create-registration-mutation";
import { Registration, RegistrationStatusKeys } from "~/modules/shared/constants";

type FormValues = Registration & {
  cpf: string;
  employeeName: string;
  admissionDate: string;
  email: string;
  id: string;
  status: RegistrationStatusKeys;
};

export const NewRegistrationForm: React.FC = () => {
  const history = useHistory();
  const createRegistration = useCreateRegistrationMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const goToHome = (): void => {
    history.push(routes.dashboard);
  };

  const onSubmit: SubmitHandler<FormValues> = (data: Registration) => {
    console.log(data)
    createRegistration.mutate(data);
  };

  return (
    <S.FormCard onSubmit={handleSubmit(onSubmit)}>
      <IconButton onClick={() => goToHome()} aria-label="back">
        <HiOutlineArrowLeft size={24} />
      </IconButton>

      {/* Name Field */}
      <TextField
        placeholder="Nome"
        label="Nome"
        {...register("employeeName", { required: "Nome é requerido" })}
        error={!!errors.employeeName}
        helperText={errors.employeeName ? errors.employeeName.message : ""}
        required
      />

      {/* Email Field */}
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

      {/* CPF Field */}
      <TextField
        placeholder="CPF"
        label="CPF"
        {...register("cpf", { required: "CPF é requerido" })}
        error={!!errors.cpf}
        helperText={errors.cpf ? errors.cpf.message : ""}
        required
      />

      {/* Admission Date Field */}
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
                newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
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

      {/* Submit Button */}
      <Button variant="contained" type="submit" color="success">
        Cadastrar
      </Button>
    </S.FormCard>
  );
};
