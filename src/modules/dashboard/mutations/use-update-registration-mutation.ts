import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  REGISTRATION_MUTATION_KEYS,
  REGISTRATION_QUERY_KEYS,
} from "~/modules/shared/constants";
import { RegistrationStatusKeys, Registration } from "~/modules/shared/types";

import * as service from "../../shared/services";
import { useSnackbar } from "~/modules/shared/contexts";

type UpdateRegistrationRequest = {
  id: string;
  status?: RegistrationStatusKeys;
};

export const useUpdateRegistrationMutation = (): UseMutationResult<
  unknown,
  AxiosError<string | number | Record<string, string>, unknown>,
  UpdateRegistrationRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();

  const updateRegistration = useMutation({
    mutationKey: [REGISTRATION_MUTATION_KEYS.update],
    mutationFn: async ({ id, ...payload }: UpdateRegistrationRequest) => {
      if (!id) {
        return Promise.reject();
      }
      return service.updateRegistration(id, payload);
    },
    onError: (error: AxiosError<string | number | Record<string, string>>) => {
      console.error(error);
      openSnackbar({
        message: "Erro ao atualizar o status do registro",
        severity: "error",
      });
    },
    onSuccess: (_, { id, status }) => {
      queryClient.setQueryData(
        [REGISTRATION_QUERY_KEYS.getRegistrations],
        (oldData: Registration[]) => {
          return oldData.map((registration) =>
            registration.id === id ? { ...registration, status } : registration
          );
        }
      );
      openSnackbar({
        message: "Sucesso ao atualizar o status do registro",
        severity: "success",
      });
    },
  });

  return updateRegistration;
};
