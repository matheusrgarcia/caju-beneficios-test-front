import { HiRefresh } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import routes from "~/router/routes";
import * as S from "./styles";
import { useGetRegistrationsQuery } from "../../queries/use-get-registrations-query";
import { useGetRegistrationsByCpfQuery } from "../../queries/use-get-registrations-by-cpf-query";

import { IconButton } from "@mui/material";
import { Button } from "~/modules/shared/components/buttons/button";
import { useEffect, useState, useRef } from "react";

type SearchBarProps = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const history = useHistory();
  const [debouncedCpf, setDebouncedCpf] = useState("");

  const { refetch } = useGetRegistrationsQuery();

  const cleanCpf = (value: string): string => {
    return value.replace(/\D/g, "");
  };

  useEffect(() => {
    if (!debouncedCpf) {
      refetch();
    }
  }, [debouncedCpf, refetch]);

  useGetRegistrationsByCpfQuery(cleanCpf(debouncedCpf), {
    enabled: !!debouncedCpf,
  });

  const { control, watch } = useForm({
    defaultValues: {
      cpf: "",
    },
  });

  const cpfValue = watch("cpf");

  const debouncedSetCpfRef = useRef(
    debounce((value: string) => {
      setDebouncedCpf(cleanCpf(value));
    }, 500)
  );

  const handleMaskedChange = (maskedValue: string): void => {
    if (onChange) {
      onChange(maskedValue);
    }
  };

  const goToNewAdmissionPage = (): void => {
    history.push(routes.newUser);
  };

  useEffect(() => {
    debouncedSetCpfRef.current(cpfValue);
  }, [cpfValue]);

  return (
    <S.SearchBarContainer>
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <S.CpfInput
            {...field}
            mask="000.000.000-00"
            onAccept={(value) => {
              field.onChange(value);
              handleMaskedChange(value);
            }}
            placeholder="Digite um CPF válido"
            {...rest}
          />
        )}
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
