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
    },
    onSuccess: (_, { id }) => {
      queryClient.setQueryData(
        [REGISTRATION_QUERY_KEYS.getRegistrations],
        (oldData: Registration[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((registration) => registration.id !== id);
        }
      );
    },
  });

  return deleteRegistration;
};
