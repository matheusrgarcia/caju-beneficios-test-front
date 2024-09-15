import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { SearchBar } from "./index";
import { useGetRegistrationsQuery } from "../../queries/use-get-registrations-query";
import { useGetRegistrationByCpfMutation } from "../../mutations/use-get-registration-by-cpf-mutation";
import userEvent from "@testing-library/user-event";
import { mockedHistory, TestingWrapper } from "../../test-utils";

vi.mock("../../queries/use-get-registrations-query", () => ({
  useGetRegistrationsQuery: vi.fn(),
}));

vi.mock("../../mutations/use-get-registration-by-cpf-mutation", () => ({
  useGetRegistrationByCpfMutation: vi.fn(),
}));

describe("SearchBar Component", () => {
  mockedHistory.location.pathname = "/";
  beforeEach(() => {
    (useGetRegistrationsQuery as Mock).mockReturnValue({
      refetch: vi.fn(),
    });

    (useGetRegistrationByCpfMutation as Mock).mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it("should render CPF input", () => {
    render(<SearchBar />, { wrapper: TestingWrapper });

    expect(
      screen.getByPlaceholderText("Digite um CPF válido")
    ).toBeInTheDocument();
  });

  it("should call getRegistrationsByCpf after debounce when CPF is entered", async () => {
    const mockMutate = vi.fn();
    (useGetRegistrationByCpfMutation as Mock).mockReturnValue({
      mutate: mockMutate,
    });

    render(<SearchBar />, { wrapper: TestingWrapper });

    const cpfInput = screen.getByPlaceholderText("Digite um CPF válido");

    userEvent.type(cpfInput, "123.456.789-00");

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ cpf: "12345678900" });
    });
  });

  it("should clear the CPF and refetch registrations when refresh button is clicked", async () => {
    const mockRefetch = vi.fn();
    (useGetRegistrationsQuery as Mock).mockReturnValue({
      refetch: mockRefetch,
    });

    render(<SearchBar />, { wrapper: TestingWrapper });

    const refreshButton = screen.getByLabelText("Recarregar registros");
    fireEvent.click(refreshButton);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("should navigate to the new admission page when 'Nova Admissão' button is clicked", async () => {
    render(<SearchBar />, { wrapper: TestingWrapper });

    const newAdmissionButton = screen.getByLabelText("Nova Admissão");
    expect(newAdmissionButton).toBeInTheDocument();

    // Use userEvent para simular o clique no botão
    await userEvent.click(newAdmissionButton);

    // Use waitFor para esperar que o pathname seja atualizado
    await waitFor(() => {
      expect(mockedHistory.location.pathname).toBe("/new-user");
    });
  });
});
