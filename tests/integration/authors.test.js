const request = require('supertest');
const app = require('../../app');

describe('Authors API', () => {
    let authorId;

    describe('POST /api/authors', () => {
        test('deve criar um autor com dados válidos', async () => {
            const authorData = {
                nome: 'Gabriel García Márquez',
                nacionalidade: 'Colombiana',
                data_nascimento: '1927-03-06'
            };

            const response = await request(app)
                .post('/api/authors')
                .send(authorData)
                .expect(201);

            expect(response.body.message).toBe('Autor criado com sucesso');
            expect(response.body.author).toBeDefined();
            expect(response.body.author.nome).toBe(authorData.nome);
            
            authorId = response.body.author.id;
        });

        test('deve retornar erro 400 para dados inválidos', async () => {
            const authorData = {
                nacionalidade: 'Brasileira'
            };

            const response = await request(app)
                .post('/api/authors')
                .send(authorData)
                .expect(400);

            expect(response.body.error).toBe('Nome é obrigatório');
        });
    });

    describe('GET /api/authors', () => {
        test('deve retornar lista de autores', async () => {
            const response = await request(app)
                .get('/api/authors')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/authors/:id', () => {
        test('deve retornar autor específico', async () => {
            const response = await request(app)
                .get(`/api/authors/${authorId}`)
                .expect(200);

            expect(response.body.id).toBe(authorId);
            expect(response.body.nome).toBe('Gabriel García Márquez');
        });

        test('deve retornar erro 404 para ID inexistente', async () => {
            const response = await request(app)
                .get('/api/authors/99999')
                .expect(404);

            expect(response.body.error).toBe('Autor não encontrado');
        });
    });

    describe('PUT /api/authors/:id', () => {
        test('deve atualizar autor existente', async () => {
            const updateData = {
                nome: 'Gabriel García Márquez',
                nacionalidade: 'Colombiana',
                data_nascimento: '1927-03-06'
            };

            const response = await request(app)
                .put(`/api/authors/${authorId}`)
                .send(updateData)
                .expect(200);

            expect(response.body.message).toBe('Autor atualizado com sucesso');
            expect(response.body.author.nome).toBe(updateData.nome);
        });

        test('deve retornar erro 400 para dados inválidos', async () => {
            const updateData = {
                nacionalidade: 'Brasileira'
            };

            const response = await request(app)
                .put(`/api/authors/${authorId}`)
                .send(updateData)
                .expect(400);

            expect(response.body.error).toBe('Nome é obrigatório');
        });

        test('deve retornar erro 404 para ID inexistente', async () => {
            const updateData = {
                nome: 'Autor Inexistente',
                nacionalidade: 'Brasileira'
            };

            const response = await request(app)
                .put('/api/authors/99999')
                .send(updateData)
                .expect(404);

            expect(response.body.error).toBe('Autor não encontrado');
        });
    });

    describe('DELETE /api/authors/:id', () => {
        test('deve retornar erro 404 para ID inexistente', async () => {
            const response = await request(app)
                .delete('/api/authors/99999')
                .expect(404);

            expect(response.body.error).toBe('Autor não encontrado');
        });

        test('deve excluir autor existente', async () => {
            const response = await request(app)
                .delete(`/api/authors/${authorId}`)
                .expect(200);

            expect(response.body.message).toBe('Autor excluído com sucesso');
        });
    });
});

