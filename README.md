# Sistema de Gerenciamento de Biblioteca

Sistema web desenvolvido em Python com Flask para gerenciamento de biblioteca, seguindo arquitetura MVC e práticas de qualidade de software.

## Funcionalidades

- **Cadastro de Autores**: Gerenciamento completo de autores com informações detalhadas
- **Cadastro de Livros**: Gerenciamento de livros vinculados aos autores
- **API RESTful**: Endpoints completos para operações CRUD
- **Interface Web**: Views responsivas para cadastro
- **Testes Automatizados**: Cobertura completa de testes unitários

## Tecnologias Utilizadas

- **Backend**: Python 3.11, Flask 2.3.3
- **Banco de Dados**: SQLite
- **Testes**: pytest, pytest-flask
- **Frontend**: HTML5, CSS3, JavaScript
- **Arquitetura**: MVC (Model-View-Controller)

## Estrutura do Projeto

```
projeto-biblioteca/
├── src/
│   ├── controllers/          # Controladores (lógica de negócio)
│   │   ├── controlador_autor.py
│   │   └── controlador_livro.py
│   ├── models/              # Modelos (entidades)
│   │   ├── autor.py
│   │   └── livro.py
│   ├── routes/              # Rotas da API
│   │   ├── rotas_autor.py
│   │   └── rotas_livro.py
│   ├── views/               # Templates HTML
│   ├── public/              # Arquivos estáticos
│   └── database/            # Configuração do banco
│       └── configuracao_bd.py
├── tests/                   # Testes automatizados
│   ├── unit/               # Testes unitários
│   │   ├── test_autor.py
│   │   └── test_livro.py
│   └── conftest.py         # Configuração dos testes
├── templates/              # Templates HTML
│   ├── base.html
│   ├── index.html
│   ├── novo_autor.html
│   └── novo_livro.html
├── app.py                  # Aplicação principal
├── requirements.txt        # Dependências
└── README.md              # Documentação
```

## Instalação

### Pré-requisitos

- Python 3.11 ou superior
- pip (gerenciador de pacotes Python)

### Passos para instalação

1. **Clone ou baixe o projeto**
   ```bash
   cd projeto-biblioteca
   ```

2. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

3. **Inicialize o banco de dados**
   ```bash
   python src/database/configuracao_bd.py
   ```

## Como Executar

### Executar a aplicação

```bash
python app.py
```

A aplicação estará disponível em: `http://localhost:5000`

### Páginas disponíveis

- **Página inicial**: `http://localhost:5000/`
- **Cadastro de autores**: `http://localhost:5000/autores/novo`
- **Cadastro de livros**: `http://localhost:5000/livros/novo`

## API RESTful

### Endpoints para Autores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/autores` | Criar novo autor |
| GET | `/autores` | Listar todos os autores |
| GET | `/autores/{id}` | Obter autor por ID |
| PUT | `/autores/{id}` | Atualizar autor |
| DELETE | `/autores/{id}` | Deletar autor |

### Endpoints para Livros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/livros` | Criar novo livro |
| GET | `/livros` | Listar todos os livros |
| GET | `/livros/{id}` | Obter livro por ID |
| PUT | `/livros/{id}` | Atualizar livro |
| DELETE | `/livros/{id}` | Deletar livro |

### Exemplos de uso da API

#### Criar um autor
```bash
curl -X POST http://localhost:5000/autores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Machado de Assis",
    "nacionalidade": "Brasileira",
    "data_nascimento": "1839-06-21",
    "biografia": "Escritor brasileiro"
  }'
```

#### Criar um livro
```bash
curl -X POST http://localhost:5000/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro",
    "isbn": "978-85-359-0277-5",
    "ano_publicacao": 1899,
    "genero": "Romance",
    "numero_paginas": 256,
    "autor_id": 1
  }'
```

## Executar Testes

### Executar todos os testes
```bash
python -m pytest tests/ -v
```

### Executar testes específicos
```bash
# Testes de autores
python -m pytest tests/unit/test_autor.py -v

# Testes de livros
python -m pytest tests/unit/test_livro.py -v
```

### Cobertura de testes

Os testes cobrem:
- ✅ Criação de entidades (casos de sucesso e erro)
- ✅ Listagem de entidades
- ✅ Busca por ID (existente e inexistente)
- ✅ Atualização de entidades
- ✅ Remoção de entidades
- ✅ Validação de dados obrigatórios
- ✅ Tratamento de erros (IDs inexistentes, dados inválidos)

## Banco de Dados

### Estrutura das tabelas

#### Tabela `autores`
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- `nome` (TEXT, NOT NULL)
- `nacionalidade` (TEXT)
- `data_nascimento` (TEXT)
- `biografia` (TEXT)

#### Tabela `livros`
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- `titulo` (TEXT, NOT NULL)
- `isbn` (TEXT, UNIQUE)
- `ano_publicacao` (INTEGER)
- `genero` (TEXT)
- `numero_paginas` (INTEGER)
- `autor_id` (INTEGER, FOREIGN KEY)

## Desenvolvimento

### Arquitetura MVC

- **Model**: Classes `Autor` e `Livro` em `src/models/`
- **View**: Templates HTML em `templates/`
- **Controller**: Classes controladoras em `src/controllers/`

### Padrões utilizados

- Separação de responsabilidades
- Injeção de dependências
- Tratamento de erros consistente
- Validação de dados
- Testes automatizados

## Autor

Projeto desenvolvido para a disciplina TAD0203 - Gestão da Qualidade de Software.

## Licença

Este projeto é desenvolvido para fins educacionais.

