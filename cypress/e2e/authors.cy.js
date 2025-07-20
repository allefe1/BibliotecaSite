describe('Cadastro de Autores', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve navegar para a página de cadastro de autores', () => {
    cy.contains('Cadastrar Autor').click();
    cy.url().should('include', '/autores/novo');
    cy.contains('Cadastrar Autor').should('be.visible');
  });

  it('deve cadastrar um novo autor com sucesso', () => {
    cy.visit('/autores/novo');
    
    cy.get('#nome').type('Virginia Woolf');
    cy.get('#nacionalidade').type('Britânica');
    cy.get('#data_nascimento').type('1882-01-25');
    
    cy.get('button[type="submit"]').click();
    
    cy.contains('Autor cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
    
    cy.get('#nome').should('have.value', '');
  });

  it('deve mostrar erro ao tentar cadastrar autor sem nome', () => {
    cy.visit('/autores/novo');
    
    cy.get('#nacionalidade').type('Brasileira');
    cy.get('#data_nascimento').type('1990-01-01');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('#nome:invalid').should('exist');
  });

  it('deve navegar para a lista de autores', () => {
    cy.contains('Autores').click();
    cy.url().should('include', '/autores');
    cy.contains('Lista de Autores').should('be.visible');
  });

  it('deve exibir autores na lista', () => {
    cy.visit('/autores');
    
    cy.get('#authorsTable', { timeout: 10000 }).should('be.visible');
    
    cy.get('#authorsTable').then(($table) => {
      if ($table.text().includes('Nenhum autor cadastrado')) {
        cy.contains('Nenhum autor cadastrado').should('be.visible');
      } else {
        cy.get('table').should('be.visible');
        cy.get('th').should('contain', 'Nome');
        cy.get('th').should('contain', 'Nacionalidade');
      }
    });
  });

  it('deve permitir excluir um autor', () => {
    cy.visit('/autores/novo');
    
    cy.get('#nome').type('Autor para Exclusão');
    cy.get('#nacionalidade').type('Teste');
    
    cy.get('button[type="submit"]').click();
    cy.contains('Autor cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
    
    cy.visit('/autores');
    
    cy.get('#authorsTable', { timeout: 10000 }).should('be.visible');
    
    cy.get('table').then(($table) => {
      if ($table.length > 0) {
        cy.get('button').contains('Excluir').first().click();
        
        cy.on('window:confirm', () => true);
        
        cy.contains('Autor excluído com sucesso', { timeout: 10000 }).should('be.visible');
      }
    });
  });

  it('deve navegar entre as páginas corretamente', () => {
    cy.visit('/autores/novo');
    
    cy.contains('Cancelar').click();
    cy.url().should('include', '/autores');
    
    cy.contains('Novo Autor').click();
    cy.url().should('include', '/autores/novo');
    
    cy.contains('Início').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

