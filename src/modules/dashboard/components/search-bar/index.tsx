import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Button } from "~/components/buttons/button";
import { IconButton } from "~/components/buttons/icon-button";
import { TextField } from "~/components/text-field";
import routes from "~/router/routes";
import * as S from "./styles";

export const SearchBar: React.FC = () => {
  const history = useHistory();

  const goToNewAdmissionPage = (): void => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
