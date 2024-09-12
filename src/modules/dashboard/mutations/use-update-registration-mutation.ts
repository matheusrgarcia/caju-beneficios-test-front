import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as service from "../../shared/services";
import {
  Registration,
  REGISTRATION_MUTATION_KEYS,
  REGISTRATION_QUERY_KEYS,
  RegistrationStatusKeys,
} from "../constants";

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
    },
    onSuccess: (_, { id, status }) => {
      queryClient.setQueryData([REGISTRATION_QUERY_KEYS.getRegistrations], (oldData: Registration[]) => {
        return oldData.map((registration) =>
          registration.id === id ? { ...registration, status } : registration
        );
      });
    },
  });

  return updateRegistration;
};
