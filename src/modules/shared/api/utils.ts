import { getEnvironmentVariable } from "../env-utils";

function formatUrl({ host, port }: { host?: string; port?: string }): string {
  return `${host}:${port}`;
}

export const getServerUrl = (): string => {
  return formatUrl({
    host: getEnvironmentVariable("SERVER_WEB_HOST"),
    port: getEnvironmentVariable("SERVER_WEB_PORT"),
  });
};

// We could track errors using this wrapper, maybe with sentry or something else.
export const trackError = (error: unknown): void => {
  console.error("error", error);
};
