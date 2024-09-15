import "@testing-library/jest-dom";

import { setupServer } from "msw/node";
import { vi } from "vitest";
import { mockedHistory } from "./modules/dashboard/test-utils";

export const mswServer = setupServer();

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  if (typeof actual !== "object" || actual === null) {
    throw new Error("Cannot spread a non-object value");
  }

  return {
    ...actual,
    useHistory: () => mockedHistory,
    useLocation: () => ({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
    }),
    useParams: () => ({}),
    useRouteMatch: () => ({ path: "/", url: "/", isExact: true, params: {} }),
  };
});

vi.mock(import("@tanstack/react-query"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

vi.mock("~/modules/shared/utils/useScreenSize", () => ({
  default: () => ({ isMobile: false }),
}));
