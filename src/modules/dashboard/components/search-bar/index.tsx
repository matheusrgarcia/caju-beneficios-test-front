import { HiRefresh } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { useHistory } from "react-router-dom";

import routes from "~/router/routes";
import * as S from "./styles";
import { useGetRegistrationsQuery } from "../../queries/use-get-registrations-query";
import { IconButton } from "@mui/material";
import { Button } from "~/modules/shared/components/buttons/button";

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const history = useHistory();
  const { refetch } = useGetRegistrationsQuery();

  const handleMaskedChange = (maskedValue: string): void => {
    if (onChange) {
      onChange(maskedValue);
    }
  };

  const goToNewAdmissionPage = (): void => {
    history.push(routes.newUser);
  };

  return (
    <S.SearchBarContainer>
      <S.CpfInput
        mask="000.000.000-00"
        onAccept={handleMaskedChange}
        placeholder="Digite um CPF válido"
        {...rest}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => refetch()}>
          <HiRefresh />
        </IconButton>
        <Button
          variant="outlined"
          color="success"
          onClick={goToNewAdmissionPage}
          endIcon={<FaPlus />}
        >
          Nova Admissão
        </Button>
      </S.Actions>
    </S.SearchBarContainer>
  );
};
