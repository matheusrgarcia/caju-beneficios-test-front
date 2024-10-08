import { useEffect } from "react";
import { HiRefresh } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { IconButton, Tooltip, FormHelperText } from "@mui/material";
import { IMaskInput } from "react-imask";

import { Button } from "~/modules/shared/components";
import useScreenSize from "~/modules/shared/utils/useScreenSize";
import routes from "~/router/routes";

import { useGetRegistrationsQuery } from "../../queries/use-get-registrations-query";
import { useGetRegistrationByCpfMutation } from "../../mutations/use-get-registration-by-cpf-mutation";

import * as S from "./styles";
import { CPF_MASK } from "~/modules/shared/constants";
import { isValidCPF } from "~/modules/shared/utils/cpf-utils";

type SearchBarProps = {
  onChange?: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const history = useHistory();
  const { refetch } = useGetRegistrationsQuery();
  const { mutate: getRegistrationsByCpf } = useGetRegistrationByCpfMutation();
  const { isMobile } = useScreenSize();

  const {
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { cpf: "" },
  });

  const cpfValue = watch("cpf");

  const cleanCpf = (value: string): string => value?.replace(/\D/g, "");

  useEffect(() => {
    const debouncedSearch = debounce((cpf: string) => {
      const cleanedCpf = cleanCpf(cpf);

      if (cleanedCpf) {
        if (isValidCPF(cleanedCpf)) {
          clearErrors("cpf");
          getRegistrationsByCpf({ cpf: cleanedCpf });
        } else {
          setError("cpf", { message: "CPF inválido, digite um CPF válido" });
        }
      }
    }, 500);

    const cleanedCpf = cleanCpf(cpfValue);

    if (!cleanedCpf) {
      debouncedSearch.cancel();
      clearErrors("cpf");
      refetch();
    } else {
      debouncedSearch(cpfValue);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [cpfValue, refetch, getRegistrationsByCpf, setError, clearErrors]);

  const handleRefetch = (): void => {
    clearErrors("cpf");
    setValue("cpf", "");
    refetch();
  };

  const goToNewAdmissionPage = (): void => {
    history.push(routes.register);
  };

  const handleMaskedChange = (maskedValue: string): void => {
    onChange?.(maskedValue);
  };

  return (
    <S.SearchBarContainer>
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <S.Flex>
            <S.CpfInput
              {...field}
              label="CPF"
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  inputComponent: IMaskInput,
                  inputProps: {
                    mask: CPF_MASK,
                    onAccept: (value: string) => {
                      field.onChange(value);
                      handleMaskedChange(value);
                    },
                    overwrite: true,
                  },
                },
              }}
              placeholder="Digite um CPF válido"
              error={!!errors.cpf}
              aria-errormessage={errors.cpf ? errors.cpf.message : ""}
              {...rest}
            />
            {errors.cpf && (
              <FormHelperText error>{errors.cpf.message}</FormHelperText>
            )}
          </S.Flex>
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
