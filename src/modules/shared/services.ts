import { httpClient } from "./api/http-client";
import { GetRegistrationsResponse } from "./types";

export const getRegistrations = (): Promise<GetRegistrationsResponse> => {
  return httpClient
    .get<GetRegistrationsResponse>(`/registrations`)
    .then((r) => r.data);
};

export const updateRegistration = (
  registrationId: string,
  data: unknown
): Promise<unknown> => {
  return httpClient
    .put(`/registrations/${registrationId}`, data)
    .then((r) => r.data);
};

export const deleteRegistration = (
  registrationId: string
): Promise<unknown> => {
  return httpClient
    .delete(`/registrations/${registrationId}`)
    .then((r) => r.data);
};
