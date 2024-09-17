/// <reference types="cypress" />

describe("Caju Beneficios - E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/dashboard");
  });

  describe("Fluxo de cadastro de Registro", () => {
    it("Should fill CPF input, click buttons and interact with cards", () => {
      cy.location("pathname").should("include", "dashboard");

      cy.get('button[aria-label="Nova Admissão"]').click();

      cy.get('input[name="employeeName"]').type("Matheus Garcia");

      cy.get('input[name="email"]').type("matheus@caju.com");

      cy.get('input[name="cpf"]').type("813.525.060-68");

      cy.get('input[name="admissionDate"]').type("18/05/2024");

      cy.get('button[aria-label="Salvar Registro"]').click();

      cy.get(".MuiDialog-container")
        .should("be.visible")
        .within(() => {
          cy.contains("Confirmar cadastro de registro").should("be.visible");
          cy.contains("Deseja realmente salvar este registro?").should(
            "be.visible"
          );
          cy.contains("button", "Cancelar").should("be.visible");
          cy.contains("button", "Confirmar").should("be.visible");
        });

      cy.get('button[aria-label="Confirmar"]').click();

      // Validate columns of dashboard
      cy.get('[data-testid="dragzone-REVIEW"]')
        .find("h3")
        .contains("Pronto para revisar");

      cy.get('[data-testid="dragzone-APPROVED"]')
        .find("h3")
        .contains("Aprovado");

      cy.get('[data-testid="dragzone-REPROVED"]')
        .find("h3")
        .contains("Reprovado");

      // Validates if user was created on the dashboard
      cy.get('[role="button"]')
        .find("h3")
        .contains("Matheus Garcia")
        .should("exist")
        .parents('[role="button"]')
        .within(() => {
          cy.contains("p", "matheus@caju.com").should("exist");
          cy.contains("span", "18/05/2024").should("exist");
          cy.contains("button", "Reprovar").should("exist");
          cy.contains("button", "Aprovar").should("exist");
        });
    });
  });
});
