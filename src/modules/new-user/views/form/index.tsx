import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useForm, SubmitHandler } from "react-hook-form";
import * as React from "react";
import routes from "~/router/routes";
import * as S from "./styles";
import { IconButton } from "~/modules/shared/components/buttons/icon-button";
import { TextField } from "~/modules/shared/components/text-field";
import { Button } from "~/modules/shared/components/buttons/button";

type FormValues = {
  nome: string;
  email: string;
  cpf: string;
  dataAdmissao: string;
};

export const NewRegistrationForm: React.FC = () => {
  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();


  const goToHome = (): void => {
    history.push(routes.dashboard);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // Form data after submit
  };

  return (
    <S.FormCard onSubmit={handleSubmit(onSubmit)}>
      <IconButton onClick={() => goToHome()} aria-label="back">
        <HiOutlineArrowLeft size={24} />
      </IconButton>


      <TextField
        placeholder="Nome"
        label="Nome"
        {...register("nome", { required: "Nome is required" })} 
        error={!!errors.nome} 
        helperText={errors.nome ? errors.nome.message : ""}
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
            message: "Email is not valid"
          }
        })} // Email validation
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />

      {/* CPF Field */}
      <TextField
        placeholder="CPF"
        label="CPF"
        {...register("cpf", { required: "CPF is required" })}
        error={!!errors.cpf}
        helperText={errors.cpf ? errors.cpf.message : ""}
      />

      {/* Admission Date Field */}
      <TextField
        label="Data de admissão"
        type="date"
        {...register("dataAdmissao", { required: "Data de admissão is required" })}
        error={!!errors.dataAdmissao}
        helperText={errors.dataAdmissao ? errors.dataAdmissao.message : ""}
      />

      {/* Submit Button */}
      <Button variant="contained" type="submit" color="success">
        Cadastrar
      </Button>
    </S.FormCard>
  );
};
