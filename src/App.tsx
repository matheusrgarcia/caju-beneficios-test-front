import Router from "~/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./modules/shared/components/header";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
