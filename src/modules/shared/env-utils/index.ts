const environmentVariables = {
    SERVER_WEB_HOST: import.meta.env.VITE_SERVER_WEB_HOST,
    SERVER_WEB_PORT: import.meta.env.VITE_SERVER_WEB_PORT,
  } as const;
  
  type EnvironmentVariable = keyof typeof environmentVariables;
  
  export function getEnvironmentVariable(name: EnvironmentVariable, { fallbackValue = '' } = {}): string {
    return environmentVariables[name] ?? fallbackValue;
  }