describe('Cadastro de Livros', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve navegar para a página de cadastro de livros', () => {
    cy.contains('Cadastrar Livro').click();
    cy.url().should('include', '/livros/novo');
    cy.contains('Cadastrar Livro').should('be.visible');
  });

  it('deve carregar lista de autores no select', () => {
    cy.visit('/livros/novo');
    
    cy.get('#author_id').should('be.visible');
    cy.get('#author_id option').should('have.length.at.least', 1);
    cy.get('#author_id option').first().should('contain', 'Selecione um autor');
  });

  it('deve cadastrar um novo livro com sucesso', () => {
    cy.visit('/livros/novo');
    
    cy.get('#titulo').type('1984');
    cy.get('#isbn').type('978-0-452-28423-4');
    cy.get('#ano_publicacao').type('1949');
    
    cy.get('button[type="submit"]').click();
    
    cy.contains('Livro cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
    
    cy.get('#titulo').should('have.value', '');
  });

  it('deve cadastrar livro com autor selecionado', () => {
    cy.visit('/autores/novo');
    cy.get('#nome').type('George Orwell');
    cy.get('#nacionalidade').type('Britânica');
    cy.get('button[type="submit"]').click();
    cy.contains('Autor cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
    
    cy.visit('/livros/novo');
    
    cy.get('#titulo').type('A Revolução dos Bichos');
    cy.get('#isbn').type('978-0-452-28424-1');
    cy.get('#ano_publicacao').type('1945');
    
    cy.get('#author_id').select(1);
    
    cy.get('button[type="submit"]').click();
    
    cy.contains('Livro cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
  });

  it('deve mostrar erro ao tentar cadastrar livro sem título', () => {
    cy.visit('/livros/novo');
    
    cy.get('#isbn').type('978-0-452-28425-8');
    cy.get('#ano_publicacao').type('2023');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('#titulo:invalid').should('exist');
  });

  it('deve navegar para a lista de livros', () => {
    cy.contains('Livros').click();
    cy.url().should('include', '/livros');
    cy.contains('Lista de Livros').should('be.visible');
  });

  it('deve exibir livros na lista', () => {
    cy.visit('/livros');
    
    cy.get('#booksTable', { timeout: 10000 }).should('be.visible');
    
    cy.get('#booksTable').then(($table) => {
      if ($table.text().includes('Nenhum livro cadastrado')) {
        cy.contains('Nenhum livro cadastrado').should('be.visible');
      } else {
        cy.get('table').should('be.visible');
        cy.get('th').should('contain', 'Título');
        cy.get('th').should('contain', 'ISBN');
        cy.get('th').should('contain', 'Autor');
      }
    });
  });

  it('deve permitir excluir um livro', () => {
    cy.visit('/livros/novo');
    
    cy.get('#titulo').type('Livro para Exclusão');
    cy.get('#isbn').type('978-0-452-28426-5');
    
    cy.get('button[type="submit"]').click();
    cy.contains('Livro cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
    
    cy.visit('/livros');
    
    cy.get('#booksTable', { timeout: 10000 }).should('be.visible');
    
    cy.get('table').then(($table) => {
      if ($table.length > 0) {
        cy.get('button').contains('Excluir').first().click();
        
        cy.on('window:confirm', () => true);
        
        cy.contains('Livro excluído com sucesso', { timeout: 10000 }).should('be.visible');
      }
    });
  });

  it('deve validar campos numéricos', () => {
    cy.visit('/livros/novo');
    
    cy.get('#ano_publicacao').type('abc');
    cy.get('#ano_publicacao').should('have.value', '');
    
    cy.get('#ano_publicacao').type('2023');
    cy.get('#ano_publicacao').should('have.value', '2023');
  });

  it('deve navegar entre as páginas corretamente', () => {
    cy.visit('/livros/novo');
    
    cy.contains('Cancelar').click();
    cy.url().should('include', '/livros');
    
    cy.contains('Novo Livro').click();
    cy.url().should('include', '/livros/novo');
    
    cy.contains('Início').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

