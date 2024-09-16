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
import { Registration } from "~/modules/shared/types";
import { useSnackbar } from "~/modules/shared/contexts";

type UpdateRegistrationRequest = {
  id: string;
};

export const useDeleteRegistrationMutation = (): UseMutationResult<
  unknown,
  AxiosError<string | number | Record<string, string>, unknown>,
  UpdateRegistrationRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();


  const deleteRegistration = useMutation({
    mutationKey: [REGISTRATION_MUTATION_KEYS.delete],
    mutationFn: async ({ id }: UpdateRegistrationRequest) => {
      if (!id) {
        return Promise.reject();
      }
      return service.deleteRegistration(id);
    },
    onError: (error: AxiosError<string | number | Record<string, string>>) => {
      console.error(error);
      openSnackbar({
        message: "Erro ao excluir registro",
        severity: "error",
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.setQueryData(
        [REGISTRATION_QUERY_KEYS.getRegistrations],
        (oldData: Registration[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((registration) => registration.id !== id);
        }
      );
      openSnackbar({
        message: "Sucesso ao excluir registro",
        severity: "success",
      });
    },
  });

  return deleteRegistration;
};
