import Router from "~/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Header, AlertDialog } from "./modules/shared/components";
import { ModalProvider } from "./modules/shared/contexts";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <AlertDialog />
          <Router />
        </ModalProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default App;
