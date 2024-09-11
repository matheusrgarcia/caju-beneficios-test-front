import { httpClient } from "./api/http-client";
import { GetRegistrationsResponse } from "./types";

export const getRegistrations = () => {
  return httpClient
    .get<GetRegistrationsResponse>(`/registrations`)
    .then((r) => r.data);
};
