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

export const useCreateRegistrationMutation = (): UseMutationResult<
  unknown,
  AxiosError<string | number | Record<string, string>, unknown>,
  Registration,
  unknown
> => {
  const queryClient = useQueryClient();
  const history = useHistory();

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
    },
    onSuccess: (newRegistration) => {
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
