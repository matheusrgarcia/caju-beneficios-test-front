import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { Router } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { ErrorBoundary } from "./";
import { mockedHistory } from "~/modules/shared/test-utils";

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

    const button = screen.getByRole("button", {
      name: /Voltar a página inicial/i,
    });
    await userEvent.click(button);
    await waitFor(() =>
      expect(mockedHistory.location.pathname).toBe("/dashboard")
    );
  });
});

function Child({ throwOnRender }: { throwOnRender: boolean }): React.ReactNode {
  if (throwOnRender) throw new Error("I'm an error");
  return <p>I am a children</p>;
}

function TestingWrapper({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  return <Router history={mockedHistory}>{children}</Router>;
}
