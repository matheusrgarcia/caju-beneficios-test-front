import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import * as service from "../../shared/services";

import {
  REGISTRATION_MUTATION_KEYS,
  REGISTRATION_QUERY_KEYS,
} from "~/modules/shared/constants";
import { useSnackbar } from "~/modules/shared/contexts";

type GetRegistrationByCpfRequest = {
  cpf: string;
};

export const useGetRegistrationByCpfMutation = (): UseMutationResult<
  unknown,
  AxiosError<string | number | Record<string, string>, unknown>,
  GetRegistrationByCpfRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();

  const getRegistrationsByCpf = useMutation({
    mutationKey: [REGISTRATION_MUTATION_KEYS.get],
    mutationFn: async ({ cpf }: GetRegistrationByCpfRequest) => {
      if (!cpf) {
        return Promise.reject();
      }
      return service.getRegistrationsByCpf(cpf);
    },
    onError: (error: AxiosError<string | number | Record<string, string>>) => {
      console.error(error);
      openSnackbar({
        message: "Erro ao buscar registro por CPF",
        severity: "error",
      });
    },
    onSuccess: (response) => {
      queryClient.setQueryData(
        [REGISTRATION_QUERY_KEYS.getRegistrations],
        response
      );
    },
  });

  return getRegistrationsByCpf;
};
