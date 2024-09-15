import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const mockedHistory = createMemoryHistory();

export const TestingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
  );

  return (
    <Router history={mockedHistory}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Router>
  );
};
