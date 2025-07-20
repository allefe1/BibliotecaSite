# Sistema de Cadastro de Livros e Autores

## Projeto Final - Gestão da Qualidade de Software

## 📋 Descrição

Este projeto implementa uma aplicação web completa para gerenciamento de livros e autores, desenvolvida com arquitetura MVC (Model-View-Controller) utilizando Node.js, Express.js e SQLite. A aplicação inclui uma API RESTful completa, interface web responsiva e uma suíte abrangente de testes automatizados.

## 🏗️ Arquitetura

### Estrutura MVC

- **Models:** Gerenciam a lógica de dados e interação com o banco SQLite
- **Views:** Interface web responsiva desenvolvida com EJS
- **Controllers:** Processam requisições HTTP e coordenam Models e Views

### Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** SQLite3
- **Template Engine:** EJS
- **Testes:** Jest, Supertest, Cypress
- **Frontend:** HTML5, CSS3, JavaScript ES6+


## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Passos para Instalação

1. **Clone ou baixe o projeto:**
   ```bash
   git clone <url-do-repositorio>
   cd projeto-final
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **O banco de dados SQLite será criado automaticamente na primeira execução**

## 🎯 Como Executar

### Executar a Aplicação

```bash
# Modo produção
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

### Executar Testes

```bash
# Todos os testes
npm test

# Testes E2E com Cypress (interface gráfica)
npm run cypress:open

# Testes E2E com Cypress (modo headless)
npm run cypress:run
```
## 🔌 API RESTful

### Endpoints de Autores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/authors` | Criar novo autor |
| GET | `/api/authors` | Listar todos os autores |
| GET | `/api/authors/:id` | Buscar autor por ID |
| PUT | `/api/authors/:id` | Atualizar autor |
| DELETE | `/api/authors/:id` | Excluir autor |

### Endpoints de Livros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/books` | Criar novo livro |
| GET | `/api/books` | Listar todos os livros |
| GET | `/api/books/:id` | Buscar livro por ID |
| PUT | `/api/books/:id` | Atualizar livro |
| DELETE | `/api/books/:id` | Excluir livro |


## 📈 Qualidade do Código

### Práticas Implementadas

- **Arquitetura MVC:** Separação clara de responsabilidades
- **Tratamento de Erros:** Middleware de tratamento de erros
- **Validação de Dados:** Validação tanto no frontend quanto no backend
- **Código Limpo:** Funções pequenas e bem definidas
- **Documentação:** Código bem documentado e README completo

