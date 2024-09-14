import { HiRefresh } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import routes from "~/router/routes";
import * as S from "./styles";
import { useGetRegistrationsQuery } from "../../queries/use-get-registrations-query";
import { useGetRegistrationByCpfMutation } from "../../mutations/use-get-registration-by-cpf-mutation";
import { IconButton } from "@mui/material";
import { Button } from "~/modules/shared/components/buttons/button";
import { useEffect, useRef } from "react";

type SearchBarProps = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const history = useHistory();
  const { refetch } = useGetRegistrationsQuery();
  const { mutate: getRegistrationsByCpf } = useGetRegistrationByCpfMutation();

  const { control, watch, setValue } = useForm({
    defaultValues: { cpf: "" },
  });

  const cpfValue = watch("cpf");

  // Debounce function setup
  const debouncedSearch = useRef(
    debounce((cpf: string) => {
      const cleanedCpf = cleanCpf(cpf);
      if (cleanedCpf) {
        getRegistrationsByCpf({ cpf: cleanedCpf });
      }
    }, 500)
  ).current;

  const cleanCpf = (value: string): string => value.replace(/\D/g, "");

  useEffect(() => {
    const cleanedCpf = cleanCpf(cpfValue);

    if (!cleanedCpf) {
      // If the input is cleared, refetch immediately to get the initial state
      refetch();
    } else {
      // Trigger debounced search when CPF has a valid value
      debouncedSearch(cpfValue);
    }
  }, [cpfValue, debouncedSearch, refetch]);

  const handleRefetch = (): void => {
    setValue("cpf", "");
    refetch(); // Reset to the initial state when clicking the refresh button
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
        <IconButton aria-label="refetch" onClick={handleRefetch}>
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
