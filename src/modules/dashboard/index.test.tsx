import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";

import { mockedHistory, TestingWrapper } from "../shared/test-utils";
import { useGetRegistrationByCpfMutation } from "./mutations/use-get-registration-by-cpf-mutation";
import { useGetRegistrationsQuery } from "./queries/use-get-registrations-query";
import { useUpdateRegistrationMutation } from "./mutations/use-update-registration-mutation";
import { useDeleteRegistrationMutation } from "./mutations/use-delete-registration-mutation";
import { DashboardPage } from "./views";
import { RegistrationStatus } from "../shared/constants";

vi.mock("./queries/use-get-registrations-query", () => ({
  useGetRegistrationsQuery: vi.fn(),
}));

vi.mock("./mutations/use-get-registration-by-cpf-mutation", () => ({
  useGetRegistrationByCpfMutation: vi.fn(),
}));

vi.mock("./mutations/use-update-registration-mutation", () => ({
  useUpdateRegistrationMutation: vi.fn(),
}));

vi.mock("./mutations/use-delete-registration-mutation", () => ({
  useDeleteRegistrationMutation: vi.fn(),
}));

const mockRegistrations = [
  {
    admissionDate: "22/10/2023",
    email: "jane@caju.com.br",
    employeeName: "Jane Doe",
    status: "REVIEW",
    cpf: "78502270001",
    id: "1",
  },
  {
    admissionDate: "24/11/2023",
    email: "mike@caju.com.br",
    employeeName: "Mike Tyson",
    status: "REPROVED",
    cpf: "78502270001",
    id: "2",
  },
  {
    admissionDate: "25/12/2023",
    email: "john@caju.com.br",
    employeeName: "John Doe",
    status: "APPROVED",
    cpf: "56642105087",
    id: "3",
  },
];

describe("DashboardPage Component", () => {
  beforeEach(() => {
    mockedHistory.location.pathname = "/";
    (useGetRegistrationsQuery as Mock).mockReturnValue({
      data: mockRegistrations,
      isLoading: false,
      refetch: vi.fn(),
    });

    (useGetRegistrationByCpfMutation as Mock).mockReturnValue({
      mutate: vi.fn(),
    });

    (useUpdateRegistrationMutation as Mock).mockReturnValue({
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

  describe("RegistrationColumns Component", () => {
    const mockUpdateRegistration = vi.fn();
    const mockDeleteRegistration = vi.fn();

    beforeEach(() => {
      (useUpdateRegistrationMutation as Mock).mockReturnValue({
        mutate: mockUpdateRegistration,
      });
      (useDeleteRegistrationMutation as Mock).mockReturnValue({
        mutate: mockDeleteRegistration,
      });
    });

    it("should render three draggable containers and its cards", () => {
      render(<DashboardPage />, { wrapper: TestingWrapper });

      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@caju.com.br")).toBeInTheDocument();
      expect(screen.getByText("22/10/2023")).toBeInTheDocument();

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@caju.com.br")).toBeInTheDocument();
      expect(screen.getByText("24/11/2023")).toBeInTheDocument();

      expect(screen.getByText("Mike Tyson")).toBeInTheDocument();
      expect(screen.getByText("mike@caju.com.br")).toBeInTheDocument();
      expect(screen.getByText("25/12/2023")).toBeInTheDocument();
    });

    it("should call update mutation when the status is changed to APPROVED", async () => {
      const { baseElement } = render(<DashboardPage />, {
        wrapper: TestingWrapper,
      });

      const approveButton = screen.getByText("Aprovar");
      fireEvent.click(approveButton);

      const title = await within(baseElement).findByText(
        "Confirmar status de registro"
      );
      const message = await within(baseElement).findByText(
        "Deseja realmente mudar o status deste registro para APROVADO?"
      );

      const nonExistentMessage = within(baseElement).queryByText(
        "Essa mensagem é inexistente"
      );

      expect(title).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(nonExistentMessage).not.toBeInTheDocument();

      const confirmModalButton = await within(baseElement).findByText(
        "Confirmar"
      );
      fireEvent.click(confirmModalButton);

      expect(mockUpdateRegistration).toHaveBeenCalledWith({
        ...mockRegistrations[0],
        status: RegistrationStatus.APPROVED,
      });

      expect(mockUpdateRegistration).not.toHaveBeenCalledWith({
        ...mockRegistrations[0],
        status: RegistrationStatus.REPROVED,
      });
    });

    it("should call update mutation when the status is changed to REPROVED", async () => {
      const { baseElement } = render(<DashboardPage />, {
        wrapper: TestingWrapper,
      });

      const approveButton = screen.getByText("Reprovar");
      fireEvent.click(approveButton);

      const title = await within(baseElement).findByText(
        "Confirmar status de registro"
      );
      const message = await within(baseElement).findByText(
        "Deseja realmente mudar o status deste registro para REPROVADO?"
      );

      const nonExistentMessage = within(baseElement).queryByText(
        "Essa mensagem é inexistente"
      );

      expect(title).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(nonExistentMessage).not.toBeInTheDocument();

      const confirmModalButton = await within(baseElement).findByText(
        "Confirmar"
      );
      fireEvent.click(confirmModalButton);

      expect(mockUpdateRegistration).toHaveBeenCalledWith({
        ...mockRegistrations[0],
        status: RegistrationStatus.REPROVED,
      });
    });

    it("should call delete mutation when a register is DELETED", async () => {
      const { baseElement } = render(<DashboardPage />, {
        wrapper: TestingWrapper,
      });

      const deleteButtons = screen.getAllByRole("button", {
        name: "Excluir registro",
      });
      fireEvent.click(deleteButtons[0]);

      const title = await within(baseElement).findByText(
        "Exclusão de Registro"
      );
      const message = await within(baseElement).findByText(
        "Deseja realmente excluir este registro?"
      );

      const nonExistentMessage = within(baseElement).queryByText(
        "Essa mensagem é inexistente"
      );

      expect(title).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(nonExistentMessage).not.toBeInTheDocument();

      const confirmModalButton = await within(baseElement).findByText(
        "Confirmar"
      );
      fireEvent.click(confirmModalButton);

      expect(mockDeleteRegistration).toHaveBeenCalled();
    });
  });
});
