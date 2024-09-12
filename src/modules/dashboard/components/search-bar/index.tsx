import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { Button } from "~/components/buttons/button";
import { IconButton } from "~/components/buttons/icon-button";

import routes from "~/router/routes";
import * as S from "./styles";
import useScreenSize from "~/modules/shared/utils/useScreenSize";
import { useGetRegistrationsQuery } from "../../queries/use-get-registrations-query";

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const history = useHistory();
  const { refetch } = useGetRegistrationsQuery();
  const { isMobile } = useScreenSize();

  const handleMaskedChange = (maskedValue: string): void => {
    if (onChange) {
      onChange(maskedValue);
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
        <IconButton aria-label="refetch" onClick={() => refetch()}>
          <HiRefresh />
        </IconButton>
        <Button
          variant={isMobile ? "small" : "default"}
          onClick={goToNewAdmissionPage}
        >
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
