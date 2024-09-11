import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import { TextField } from "~/components/text-field";
import { Button } from "~/components/buttons/button";
import { IconButton } from "~/components/buttons/icon-button";
import routes from "~/router/routes";

import * as S from "./styles";
import * as React from "react";

const NewUserPage: React.FC = () => {
  const history = useHistory();

  const goToHome = (): void => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome" />
        <TextField placeholder="Email" label="Email" type="email" />
        <TextField placeholder="CPF" label="CPF" />
        <TextField label="Data de admissão" type="date" />
        <Button
          onClick={() => {
            console.error("Missing functionality");
          }}
        >
          Cadastrar
        </Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
