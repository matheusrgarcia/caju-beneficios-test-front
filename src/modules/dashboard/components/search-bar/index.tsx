import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { Button } from "~/components/buttons/button";
import { IconButton } from "~/components/buttons/icon-button";

import routes from "~/router/routes";
import * as S from "./styles";

interface SearchBarProps {
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const history = useHistory();

  // Function to handle the value change (masked value)
  const handleMaskedChange = (maskedValue: string): void => {
    if (onChange) {
      onChange(maskedValue); // Call parent onChange with the masked value
    }
  };

  const goToNewAdmissionPage = (): void => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <S.CpfInput
        mask="000.000.000-00"
        onAccept={handleMaskedChange}
        placeholder="Digite um CPF válido"
        {...rest}
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
