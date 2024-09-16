import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useHistory } from "react-router-dom";

import {
  REGISTRATION_MUTATION_KEYS,
  REGISTRATION_QUERY_KEYS,
  RegistrationStatus,
} from "~/modules/shared/constants";
import { Registration } from "~/modules/shared/types";
import routes from "~/router/routes";

import * as service from "../../shared/services";
import { useSnackbar } from "~/modules/shared/contexts";

export const useCreateRegistrationMutation = (): UseMutationResult<
  unknown,
  AxiosError<string | number | Record<string, string>, unknown>,
  Registration,
  unknown
> => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { openSnackbar } = useSnackbar();

  const createRegistration = useMutation({
    mutationKey: [REGISTRATION_MUTATION_KEYS.update],
    mutationFn: async (payload: Registration) => {
      return service.createRegistration({
        ...payload,
        status: RegistrationStatus.REVIEW,
      });
    },
    onError: (error: AxiosError<string | number | Record<string, string>>) => {
      console.error(error);
      openSnackbar({
        message: "Erro ao salvar registro",
        severity: "error",
      });
    },
    onSuccess: (newRegistration) => {
      openSnackbar({
        message: "Sucesso ao salvar registro",
        severity: "success",
      });
      queryClient.setQueryData<Registration[] | undefined>(
        [REGISTRATION_QUERY_KEYS.getRegistrations],
        (oldData) => {
          return oldData
            ? [...oldData, newRegistration as Registration]
            : [newRegistration as Registration];
        }
      );
      history.push(routes.dashboard);
    },
  });

  return createRegistration;
};
