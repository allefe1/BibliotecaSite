const Author = require('../../src/models/Author');
const { closeDatabase } = require('../../src/database/database');

describe('Author Model', () => {
    afterAll(async () => {
        await closeDatabase();
    });

    describe('create', () => {
        test('deve criar um autor com dados válidos', async () => {
            const authorData = {
                nome: 'Machado de Assis',
                nacionalidade: 'Brasileira',
                data_nascimento: '1839-06-21'
            };

            const authorId = await Author.create(authorData);
            expect(authorId).toBeDefined();
            expect(typeof authorId).toBe('number');
        });

        test('deve falhar ao criar autor sem nome', async () => {
            const authorData = {
                nacionalidade: 'Brasileira',
                data_nascimento: '1839-06-21'
            };

            await expect(Author.create(authorData)).rejects.toThrow();
        });
    });

    describe('findAll', () => {
        test('deve retornar array de autores', async () => {
            const authors = await Author.findAll();
            expect(Array.isArray(authors)).toBe(true);
        });
    });

    describe('findById', () => {
        test('deve retornar autor existente', async () => {
            const authorData = {
                nome: 'Clarice Lispector',
                nacionalidade: 'Brasileira',
                data_nascimento: '1920-12-10'
            };

            const authorId = await Author.create(authorData);
            const author = await Author.findById(authorId);

            expect(author).toBeDefined();
            expect(author.nome).toBe(authorData.nome);
            expect(author.nacionalidade).toBe(authorData.nacionalidade);
        });

        test('deve retornar undefined para ID inexistente', async () => {
            const author = await Author.findById(99999);
            expect(author).toBeUndefined();
        });
    });

    describe('update', () => {
        test('deve atualizar autor existente', async () => {
            const authorData = {
                nome: 'José Saramago',
                nacionalidade: 'Portuguesa',
                data_nascimento: '1922-11-16'
            };

            const authorId = await Author.create(authorData);
            const updateData = {
                nome: 'José Saramago',
                nacionalidade: 'Portuguesa',
                data_nascimento: '1922-11-16'
            };

            const updated = await Author.update(authorId, updateData);
            expect(updated).toBe(true);

            const author = await Author.findById(authorId);
            expect(author.nome).toBe(updateData.nome);
        });

        test('deve retornar false para ID inexistente', async () => {
            const updateData = {
                nome: 'Autor Inexistente',
                nacionalidade: 'Brasileira'
            };

            const updated = await Author.update(99999, updateData);
            expect(updated).toBe(false);
        });
    });

    describe('delete', () => {
        test('deve excluir autor existente', async () => {
            const authorData = {
                nome: 'Autor para Exclusão',
                nacionalidade: 'Brasileira'
            };

            const authorId = await Author.create(authorData);
            const deleted = await Author.delete(authorId);
            expect(deleted).toBe(true);

            const author = await Author.findById(authorId);
            expect(author).toBeUndefined();
        });

        test('deve retornar false para ID inexistente', async () => {
            const deleted = await Author.delete(99999);
            expect(deleted).toBe(false);
        });
    });
});

