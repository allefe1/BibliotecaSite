describe('Navegação Geral', () => {
  it('deve carregar a página inicial corretamente', () => {
    cy.visit('/');
    
    cy.contains('Sistema de Cadastro de Livros e Autores').should('be.visible');
    cy.contains('Bem-vindo ao Sistema de Biblioteca').should('be.visible');
    
    cy.get('nav').should('be.visible');
    cy.contains('Início').should('be.visible');
    cy.contains('Autores').should('be.visible');
    cy.contains('Livros').should('be.visible');
    cy.contains('Cadastrar Autor').should('be.visible');
    cy.contains('Cadastrar Livro').should('be.visible');
  });

  it('deve ter todos os links funcionando na navegação', () => {
    cy.visit('/');
    
    cy.contains('Autores').click();
    cy.url().should('include', '/autores');
    cy.go('back');
    
    cy.contains('Livros').click();
    cy.url().should('include', '/livros');
    cy.go('back');
    
    cy.contains('Cadastrar Autor').click();
    cy.url().should('include', '/autores/novo');
    cy.go('back');
    
    cy.contains('Cadastrar Livro').click();
    cy.url().should('include', '/livros/novo');
    cy.go('back');
    
    cy.contains('Início').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('deve ter cards funcionais na página inicial', () => {
    cy.visit('/');
    
    cy.contains('Ver Autores').click();
    cy.url().should('include', '/autores');
    cy.go('back');
    
    cy.contains('Cadastrar Autor').click();
    cy.url().should('include', '/autores/novo');
    cy.go('back');
    
    cy.contains('Ver Livros').click();
    cy.url().should('include', '/livros');
    cy.go('back');
    
    cy.contains('Cadastrar Livro').click();
    cy.url().should('include', '/livros/novo');
  });

  it('deve ter layout responsivo', () => {
    cy.visit('/');
    
    cy.viewport(1280, 720);
    cy.get('nav ul').should('be.visible');
    
    cy.viewport(768, 1024);
    cy.get('nav ul').should('be.visible');
    
    cy.viewport(375, 667);
    cy.get('nav ul').should('be.visible');
  });

  it('deve exibir footer corretamente', () => {
    cy.visit('/');
    
    cy.get('footer').should('be.visible');
    cy.contains('© 2025 Sistema de Biblioteca - Projeto Final GQS').should('be.visible');
  });

  it('deve executar fluxo completo: cadastrar autor e livro', () => {
    cy.visit('/');
    
    cy.contains('Cadastrar Autor').click();
    cy.get('#nome').type('Fluxo Teste Autor');
    cy.get('#nacionalidade').type('Brasileira');
    cy.get('#data_nascimento').type('1980-01-01');
    cy.get('button[type="submit"]').click();
    cy.contains('Autor cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
    
    cy.contains('Cadastrar Livro').click();
    cy.get('#titulo').type('Fluxo Teste Livro');
    cy.get('#isbn').type('978-0-123-45678-9');
    cy.get('#ano_publicacao').type('2023');
    cy.get('#author_id').select(1);
    cy.get('button[type="submit"]').click();
    cy.contains('Livro cadastrado com sucesso', { timeout: 10000 }).should('be.visible');
    
    cy.contains('Livros').click();
    cy.get('#booksTable', { timeout: 10000 }).should('be.visible');
    cy.contains('Fluxo Teste Livro').should('be.visible');
    
    cy.contains('Autores').click();
    cy.get('#authorsTable', { timeout: 10000 }).should('be.visible');
    cy.contains('Fluxo Teste Autor').should('be.visible');
  });
});

