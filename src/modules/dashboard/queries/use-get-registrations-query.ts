import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

import { GetRegistrationsResponse } from "~/modules/shared/types";

import * as service from "../../shared/services";
import { trackError } from "../../shared/api/utils";
import {
  DEFAULT_QUERY_STALE_TIME,
  REGISTRATION_QUERY_KEYS,
} from "../constants";

export const useGetRegistrationsQuery = ({
  enabled,
}: { enabled?: boolean } = {}): UseQueryResult<
  GetRegistrationsResponse,
  Error
> => {
  const getRegistrations = useQuery({
    queryKey: [REGISTRATION_QUERY_KEYS.getRegistrations],
    queryFn: () => service.getRegistrations(),
    staleTime: DEFAULT_QUERY_STALE_TIME,
    enabled: enabled,
  });

  const { error, isError } = getRegistrations;

  useEffect(() => {
    if (isError) {
      trackError(error);
    }
  }, [isError, error]);

  return getRegistrations;
};
