import {
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

import { GetRegistrationsResponse } from "~/modules/shared/types";
import * as service from "../../shared/services";
import { trackError } from "../../shared/api/utils";
import {
  REGISTRATION_QUERY_KEYS,
  DEFAULT_QUERY_STALE_TIME,
} from "~/modules/shared/constants";

export const useGetRegistrationsByCpfQuery = (
  cpf: string,
  { enabled }: { enabled?: boolean } = {}
): UseQueryResult<GetRegistrationsResponse, Error> => {
  const queryClient = useQueryClient();

  const getRegistrationsByCpf = useQuery<GetRegistrationsResponse, Error>({
    queryKey: [REGISTRATION_QUERY_KEYS.getRegistrations, cpf],
    queryFn: () => service.getRegistrationsByCpf(cpf),
    staleTime: DEFAULT_QUERY_STALE_TIME,
    enabled: enabled && !!cpf,
  });

  const { data, error, isError } = getRegistrationsByCpf;

  useEffect(() => {
    if (data) {
      queryClient.setQueryData(
        [REGISTRATION_QUERY_KEYS.getRegistrations],
        data
      );
    }
  }, [data, queryClient]);

  useEffect(() => {
    if (isError) {
      trackError(error);
    }
  }, [isError, error]);

  return getRegistrationsByCpf;
};
