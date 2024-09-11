import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useEffect } from "react";

import * as service from "../../shared/services";
import { trackError } from "../../shared/api/utils";
import { DEFAULT_QUERY_STALE_TIME } from "../constants";
import { GetRegistrationsResponse } from "~/modules/shared/types";

export const useGetRegistrationsQuery = ({
  enabled,
}: { enabled?: boolean } = {}): UseQueryResult<GetRegistrationsResponse, Error> => {
  const getRegistrations = useQuery({
    queryKey: ["getRegistrations"],
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
