describe("Criar nova tarefa com subtarefa", () => {
  it("Deve criar uma nova tarefa com uma subtarefa", () => {
    cy.visit("http://localhost:3000"); // URL da sua aplicação

    // // 1. Abrir o modal/criar nova tarefa
    // cy.get('[data-testid="criar-tarefa-btn"]').click();

    // // 2. Preencher título da tarefa
    // cy.get('[data-testid="titulo-input"]').type("Tarefa teste Cypress");

    // // 3. Adicionar subtarefa
    // cy.get('[data-testid="adicionar-subtarefa-btn"]').click();
    // cy.get('[data-testid="subtarefa-input-0"]').type("Subtarefa 1");

    // // 4. Salvar tarefa
    // cy.get('[data-testid="salvar-tarefa-btn"]').click();

    // // 5. Verificar se a tarefa foi criada
    // cy.contains("Tarefa teste Cypress").should("exist");

    // // 6. Verificar se a subtarefa aparece
    // cy.contains("Subtarefa 1").should("exist");
  });
});
