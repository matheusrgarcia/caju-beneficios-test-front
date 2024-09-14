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
  RegistrationStatus,
} from "~/modules/shared/constants";

export const useCreateRegistrationMutation = (): UseMutationResult<
  unknown,
  AxiosError<string | number | Record<string, string>, unknown>,
  Registration,
  unknown
> => {
  const queryClient = useQueryClient();

  const createRegistration = useMutation({
    mutationKey: [REGISTRATION_MUTATION_KEYS.update],
    mutationFn: async ({ ...payload }: Registration) => {
      return service.createRegistration({
        ...payload,
        status: RegistrationStatus.REVIEW,
      });
    },
    onError: (error: AxiosError<string | number | Record<string, string>>) => {
      console.error(error);
    },
    onSuccess: (_, registration) => {
      queryClient.setQueryData(
        [REGISTRATION_QUERY_KEYS.getRegistrations],
        (oldData: Registration[]) => {
          return oldData.push(registration);
        }
      );
    },
  });

  return createRegistration;
};
