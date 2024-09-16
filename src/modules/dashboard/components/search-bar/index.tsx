import { useEffect, useRef } from "react";
import { HiRefresh } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { IconButton, Tooltip } from "@mui/material";
import { IMaskInput } from "react-imask";

import { Button } from "~/modules/shared/components";
import useScreenSize from "~/modules/shared/utils/useScreenSize";
import routes from "~/router/routes";

import { useGetRegistrationsQuery } from "../../queries/use-get-registrations-query";
import { useGetRegistrationByCpfMutation } from "../../mutations/use-get-registration-by-cpf-mutation";

import * as S from "./styles";

type SearchBarProps = {
  onChange?: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const history = useHistory();
  const { refetch: reloadQuery } = useGetRegistrationsQuery();
  const { mutate: getRegistrationsByCpf } = useGetRegistrationByCpfMutation();
  const { isMobile } = useScreenSize();

  const { control, watch, setValue } = useForm({
    defaultValues: { cpf: "" },
  });

  const cpfValue = watch("cpf");

  const debouncedSearch = useRef(
    debounce((cpf: string) => {
      const cleanedCpf = cleanCpf(cpf);
      if (cleanedCpf) {
        getRegistrationsByCpf({ cpf: cleanedCpf });
      }
    }, 500)
  ).current;

  const cleanCpf = (value: string): string => value?.replace(/\D/g, "");

  useEffect(() => {
    const cleanedCpf = cleanCpf(cpfValue);

    if (!cleanedCpf) {
      debouncedSearch.cancel();
      reloadQuery();
    } else {
      debouncedSearch(cpfValue);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [cpfValue, debouncedSearch, reloadQuery]);

  const handleRefetch = (): void => {
    setValue("cpf", "");
    reloadQuery();
  };

  const goToNewAdmissionPage = (): void => {
    history.push(routes.newUser);
  };

  const handleMaskedChange = (maskedValue: string): void => {
    if (onChange) onChange(maskedValue);
  };

  return (
    <S.SearchBarContainer>
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <S.CpfInput
            {...field}
            label="CPF"
            variant="outlined"
            fullWidth
            slotProps={{
              input: {
                inputComponent: IMaskInput,
                inputProps: {
                  mask: "000.000.000-00",
                  onAccept: (value: string) => {
                    field.onChange(value);
                    handleMaskedChange(value);
                  },
                  overwrite: true,
                },
              },
            }}
            placeholder="Digite um CPF válido"
            {...rest}
          />
        )}
      />
      <S.Actions>
        <Tooltip title="Recarregar registros">
          <IconButton aria-label="Recarregar registros" onClick={handleRefetch}>
            <HiRefresh />
          </IconButton>
        </Tooltip>

        {isMobile ? (
          <Tooltip title="Adicionar nova admissão">
            <IconButton
              color="success"
              onClick={goToNewAdmissionPage}
              aria-label="Adicionar nova admissão"
            >
              <FaPlus />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            variant="outlined"
            color="success"
            onClick={goToNewAdmissionPage}
            endIcon={<FaPlus />}
            aria-label="Nova Admissão"
          >
            Nova Admissão
          </Button>
        )}
      </S.Actions>
    </S.SearchBarContainer>
  );
};
