import { Button } from "./button/index";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button", () => {
  it("Should render the button with the correct label", () => {
    render(<Button>Ativar</Button>);
    const button = screen.getByRole("button", { name: /ativar/i });

    expect(button).toBeInTheDocument();
  });

  it("Should have the correct type", () => {
    render(<Button type="submit">Ativar</Button>);
    const button = screen.getByRole("button", { name: /ativar/i });

    expect(button).toHaveAttribute("type", "submit");
  });

  it("Should handle click events", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Ativar</Button>);
    const button = screen.getByRole("button", { name: /ativar/i });

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
