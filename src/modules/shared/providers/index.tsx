import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";
import { ModalProvider, SnackbarProvider } from "../contexts";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <ModalProvider>{children}</ModalProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};
