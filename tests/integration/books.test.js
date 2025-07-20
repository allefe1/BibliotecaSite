const request = require('supertest');
const app = require('../../app');

describe('Books API', () => {
    let authorId;
    let bookId;

    beforeAll(async () => {
        const authorData = {
            nome: 'Jorge Luis Borges',
            nacionalidade: 'Argentina',
            data_nascimento: '1899-08-24'
        };

        const authorResponse = await request(app)
            .post('/api/authors')
            .send(authorData);
        
        authorId = authorResponse.body.author.id;
    });

    describe('POST /api/books', () => {
        test('deve criar um livro com dados válidos', async () => {
            const bookData = {
                titulo: 'Ficções',
                isbn: '978-85-359-0284-7',
                ano_publicacao: 1944,
                author_id: authorId
            };

            const response = await request(app)
                .post('/api/books')
                .send(bookData)
                .expect(201);

            expect(response.body.message).toBe('Livro criado com sucesso');
            expect(response.body.book).toBeDefined();
            expect(response.body.book.titulo).toBe(bookData.titulo);
            
            bookId = response.body.book.id;
        });

        test('deve criar livro sem autor', async () => {
            const bookData = {
                titulo: 'Livro Independente',
                isbn: '978-85-359-0285-8',
                ano_publicacao: 2023
            };

            const response = await request(app)
                .post('/api/books')
                .send(bookData)
                .expect(201);

            expect(response.body.book.titulo).toBe(bookData.titulo);
        });

        test('deve retornar erro 400 para dados inválidos', async () => {
            const bookData = {
                isbn: '978-85-359-0286-9',
                ano_publicacao: 2023
            };

            const response = await request(app)
                .post('/api/books')
                .send(bookData)
                .expect(400);

            expect(response.body.error).toBe('Título é obrigatório');
        });

        test('deve retornar erro 400 para autor inexistente', async () => {
            const bookData = {
                titulo: 'Livro com Autor Inexistente',
                isbn: '978-85-359-0287-0',
                author_id: 99999
            };

            const response = await request(app)
                .post('/api/books')
                .send(bookData)
                .expect(400);

            expect(response.body.error).toBe('Autor não encontrado');
        });

        test('deve retornar erro 400 para ISBN duplicado', async () => {
            const bookData = {
                titulo: 'Outro Livro',
                isbn: '978-85-359-0284-7',
                ano_publicacao: 2023,
                author_id: authorId
            };

            const response = await request(app)
                .post('/api/books')
                .send(bookData)
                .expect(400);

            expect(response.body.error).toBe('ISBN já existe');
        });
    });

    describe('GET /api/books', () => {
        test('deve retornar lista de livros', async () => {
            const response = await request(app)
                .get('/api/books')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/books/:id', () => {
        test('deve retornar livro específico', async () => {
            const response = await request(app)
                .get(`/api/books/${bookId}`)
                .expect(200);

            expect(response.body.id).toBe(bookId);
            expect(response.body.titulo).toBe('Ficções');
        });

        test('deve retornar erro 404 para ID inexistente', async () => {
            const response = await request(app)
                .get('/api/books/99999')
                .expect(404);

            expect(response.body.error).toBe('Livro não encontrado');
        });
    });

    describe('PUT /api/books/:id', () => {
        test('deve atualizar livro existente', async () => {
            const updateData = {
                titulo: 'Ficções - Edição Revisada',
                isbn: '978-85-359-0284-7',
                ano_publicacao: 1945,
                author_id: authorId
            };

            const response = await request(app)
                .put(`/api/books/${bookId}`)
                .send(updateData)
                .expect(200);

            expect(response.body.message).toBe('Livro atualizado com sucesso');
            expect(response.body.book.titulo).toBe(updateData.titulo);
        });

        test('deve retornar erro 400 para dados inválidos', async () => {
            const updateData = {
                isbn: '978-85-359-0288-1',
                ano_publicacao: 2023
            };

            const response = await request(app)
                .put(`/api/books/${bookId}`)
                .send(updateData)
                .expect(400);

            expect(response.body.error).toBe('Título é obrigatório');
        });

        test('deve retornar erro 404 para ID inexistente', async () => {
            const updateData = {
                titulo: 'Livro Inexistente',
                isbn: '978-85-359-0289-2'
            };

            const response = await request(app)
                .put('/api/books/99999')
                .send(updateData)
                .expect(404);

            expect(response.body.error).toBe('Livro não encontrado');
        });
    });

    describe('DELETE /api/books/:id', () => {
        test('deve retornar erro 404 para ID inexistente', async () => {
            const response = await request(app)
                .delete('/api/books/99999')
                .expect(404);

            expect(response.body.error).toBe('Livro não encontrado');
        });

        test('deve excluir livro existente', async () => {
            const response = await request(app)
                .delete(`/api/books/${bookId}`)
                .expect(200);

            expect(response.body.message).toBe('Livro excluído com sucesso');
        });
    });
});

