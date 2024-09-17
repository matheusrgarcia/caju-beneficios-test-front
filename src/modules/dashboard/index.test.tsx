import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";

import { mockedHistory, TestingWrapper } from "../shared/test-utils";
import { useGetRegistrationByCpfMutation } from "./mutations/use-get-registration-by-cpf-mutation";
import { useGetRegistrationsQuery } from "./queries/use-get-registrations-query";
import { DashboardPage } from "./views";

vi.mock("./queries/use-get-registrations-query", () => ({
  useGetRegistrationsQuery: vi.fn(),
}));

vi.mock("./mutations/use-get-registration-by-cpf-mutation", () => ({
  useGetRegistrationByCpfMutation: vi.fn(),
}));

describe("DashboardPage Component", () => {
  beforeEach(() => {
    mockedHistory.location.pathname = "/";
    (useGetRegistrationsQuery as Mock).mockReturnValue({
      refetch: vi.fn(),
    });

    (useGetRegistrationByCpfMutation as Mock).mockReturnValue({
      mutate: vi.fn(),
    });
  });

  describe("Search Bar Component", () => {
    it("should render CPF input", () => {
      render(<DashboardPage />, { wrapper: TestingWrapper });

      expect(
        screen.getByPlaceholderText("Digite um CPF válido")
      ).toBeInTheDocument();
    });

    it("should call getRegistrationsByCpf after debounce when a Valid CPF is entered", async () => {
      const mockMutate = vi.fn();
      (useGetRegistrationByCpfMutation as Mock).mockReturnValue({
        mutate: mockMutate,
      });

      render(<DashboardPage />, { wrapper: TestingWrapper });

      const cpfInput = screen.getByPlaceholderText("Digite um CPF válido");

      userEvent.type(cpfInput, "323.578.560-41");

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith({ cpf: "32357856041" });
      });
    });

    it("should NOT call getRegistrationsByCpf after debounce when a invalid CPF is entered", async () => {
      const mockMutate = vi.fn();
      (useGetRegistrationByCpfMutation as Mock).mockReturnValue({
        mutate: mockMutate,
      });

      render(<DashboardPage />, { wrapper: TestingWrapper });

      const cpfInput = screen.getByPlaceholderText("Digite um CPF válido");

      userEvent.type(cpfInput, "123.456.789-10");

      await waitFor(() => {
        const errorMessage = screen.getByText(
          "CPF inválido, digite um CPF válido"
        );
        expect(errorMessage).toBeInTheDocument();
      });

      expect(mockMutate).not.toHaveBeenCalledWith({ cpf: "12345678910" });
    });

    it("should clear the CPF and refetch registrations when refresh button is clicked", async () => {
      const mockRefetch = vi.fn();
      (useGetRegistrationsQuery as Mock).mockReturnValue({
        refetch: mockRefetch,
      });

      render(<DashboardPage />, { wrapper: TestingWrapper });

      const refreshButton = screen.getByLabelText("Recarregar registros");
      fireEvent.click(refreshButton);

      expect(mockRefetch).toHaveBeenCalled();
    });

    it("should navigate to the new admission page when 'Nova Admissão' button is clicked", async () => {
      render(<DashboardPage />, { wrapper: TestingWrapper });

      const newAdmissionButton = screen.getByLabelText("Nova Admissão");
      expect(newAdmissionButton).toBeInTheDocument();

      await userEvent.click(newAdmissionButton);

      await waitFor(() => {
        expect(mockedHistory.location.pathname).toBe("/register");
      });
    });
  });
});
