import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ErrorBoundary } from "./";
import { mockedHistory, TestingWrapper } from "~/modules/shared/test-utils";
import routes from "~/router/routes";

describe("ErrorBoundary", () => {
  beforeEach(() => {
    mockedHistory.location.pathname = "/";
  });

  it("if theres no error it shows the children", async () => {
    render(
      <ErrorBoundary>
        <Child throwOnRender={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/i am a children/i)).toBeInTheDocument();
  });

  it("if theres an error while rendering it shows the message", async () => {
    render(
      <ErrorBoundary>
        <Child throwOnRender={true} />
      </ErrorBoundary>,
      { wrapper: TestingWrapper }
    );

    expect(
      screen.getByRole("heading", { name: /erro inesperado/i })
    ).toBeInTheDocument();

    const originalLocation = window.location;
    window.location = { ...originalLocation, pathname: "/" };

    const button = screen.getByRole("button", {
      name: /Voltar a página inicial/i,
    });
    await userEvent.click(button);

    expect(window.location.pathname).toBe(routes.dashboard);

    window.location = originalLocation;
  });
});

function Child({ throwOnRender }: { throwOnRender: boolean }): React.ReactNode {
  if (throwOnRender) throw new Error("I'm an error");
  return <p>I am a children</p>;
}
