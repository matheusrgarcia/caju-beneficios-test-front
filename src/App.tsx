import Router from "~/router";

import {
  Header,
  AlertDialog,
  Snackbar,
  ErrorBoundary,
} from "./modules/shared/components";

import { Providers } from "./modules/shared/providers";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Providers>
        <Header />
        <AlertDialog />
        <Snackbar />
        <Router />
      </Providers>
    </ErrorBoundary>
  );
};

export default App;
