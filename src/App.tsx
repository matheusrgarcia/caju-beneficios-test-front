import Router from "~/router";

import { Header, ErrorBoundary } from "./modules/shared/components";

import { Providers } from "./modules/shared/providers";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Providers>
        <Header />
        <Router />
      </Providers>
    </ErrorBoundary>
  );
};

export default App;
