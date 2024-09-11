import { Button } from "./button/index";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("Should show button", () => {
    const { debug } = render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i }));
    debug();
  });
});
