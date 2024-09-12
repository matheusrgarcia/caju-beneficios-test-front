import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import * as service from "../../shared/services";
import {
  REGISTRATION_MUTATION_KEYS,
  RegistrationStatusKeys,
} from "../constants";

type UpdateRegistratiobRequest = {
  id: string;
  status?: RegistrationStatusKeys;
};

export const useDeleteRegistrationMutation = (): UseMutationResult<
  unknown,
  AxiosError<string | number | Record<string, string>, unknown>,
  UpdateRegistratiobRequest,
  unknown
> => {
  const updateRegistration = useMutation({
    mutationKey: [REGISTRATION_MUTATION_KEYS.delete],
    mutationFn: async ({ id }: UpdateRegistratiobRequest) => {
      if (!id) {
        return Promise.reject();
      }
      return service.deleteRegistration(id);
    },
    onError: (error: AxiosError<string | number | Record<string, string>>) => {
      console.error(error);
    },
    onSuccess: () => {
      console.log("successful deletion");
    },
  });
  return updateRegistration;
};
