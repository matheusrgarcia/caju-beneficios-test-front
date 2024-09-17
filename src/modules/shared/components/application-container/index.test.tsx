import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LayoutContainer } from ".";
import { TestingWrapper } from "../../test-utils";

describe("LayoutContainer", () => {
  it("Should render the children passed to it", () => {
    render(
      <LayoutContainer>
        <div>Test Child</div>
      </LayoutContainer>,
      { wrapper: TestingWrapper }
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("Should apply centralized styling when the centralized prop is true", () => {
    const { container } = render(<LayoutContainer centralized>Content</LayoutContainer>, {
      wrapper: TestingWrapper,
    });

    const appContainer = container.firstChild;
    expect(appContainer).toHaveStyle("align-items: center");
  });

  it("Should render the Footer and Content components", () => {
    render(
      <LayoutContainer>
        <LayoutContainer.Footer />
        <LayoutContainer.Content>Some content</LayoutContainer.Content>
      </LayoutContainer>,
      {
        wrapper: TestingWrapper,
      }
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Some content")).toBeInTheDocument();
  });
});
