const Book = require('../../src/models/Book');
const Author = require('../../src/models/Author');
const { closeDatabase } = require('../../src/database/database');

describe('Book Model', () => {
    let authorId;

    beforeAll(async () => {
        const authorData = {
            nome: 'Autor de Teste',
            nacionalidade: 'Brasileira'
        };
        authorId = await Author.create(authorData);
    });

    afterAll(async () => {
        await closeDatabase();
    });

    describe('create', () => {
        test('deve criar um livro com dados válidos', async () => {
            const bookData = {
                titulo: 'Dom Casmurro',
                isbn: '978-85-359-0277-5',
                ano_publicacao: 1899,
                author_id: authorId
            };

            const bookId = await Book.create(bookData);
            expect(bookId).toBeDefined();
            expect(typeof bookId).toBe('number');
        });

        test('deve criar livro sem autor', async () => {
            const bookData = {
                titulo: 'Livro Sem Autor',
                isbn: '978-85-359-0278-6',
                ano_publicacao: 2023
            };

            const bookId = await Book.create(bookData);
            expect(bookId).toBeDefined();
        });

        test('deve falhar ao criar livro sem título', async () => {
            const bookData = {
                isbn: '978-85-359-0279-7',
                ano_publicacao: 2023,
                author_id: authorId
            };

            await expect(Book.create(bookData)).rejects.toThrow();
        });
    });

    describe('findAll', () => {
        test('deve retornar array de livros', async () => {
            const books = await Book.findAll();
            expect(Array.isArray(books)).toBe(true);
        });
    });

    describe('findById', () => {
        test('deve retornar livro existente', async () => {
            const bookData = {
                titulo: 'O Cortiço',
                isbn: '978-85-359-0280-3',
                ano_publicacao: 1890,
                author_id: authorId
            };

            const bookId = await Book.create(bookData);
            const book = await Book.findById(bookId);

            expect(book).toBeDefined();
            expect(book.titulo).toBe(bookData.titulo);
            expect(book.isbn).toBe(bookData.isbn);
            expect(book.ano_publicacao).toBe(bookData.ano_publicacao);
        });

        test('deve retornar undefined para ID inexistente', async () => {
            const book = await Book.findById(99999);
            expect(book).toBeUndefined();
        });
    });

    describe('update', () => {
        test('deve atualizar livro existente', async () => {
            const bookData = {
                titulo: 'Livro Original',
                isbn: '978-85-359-0281-4',
                ano_publicacao: 2020,
                author_id: authorId
            };

            const bookId = await Book.create(bookData);
            const updateData = {
                titulo: 'Livro Atualizado',
                isbn: '978-85-359-0281-4',
                ano_publicacao: 2021,
                author_id: authorId
            };

            const updated = await Book.update(bookId, updateData);
            expect(updated).toBe(true);

            const book = await Book.findById(bookId);
            expect(book.titulo).toBe(updateData.titulo);
            expect(book.ano_publicacao).toBe(updateData.ano_publicacao);
        });

        test('deve retornar false para ID inexistente', async () => {
            const updateData = {
                titulo: 'Livro Inexistente',
                isbn: '978-85-359-0282-5'
            };

            const updated = await Book.update(99999, updateData);
            expect(updated).toBe(false);
        });
    });

    describe('delete', () => {
        test('deve excluir livro existente', async () => {
            const bookData = {
                titulo: 'Livro para Exclusão',
                isbn: '978-85-359-0283-6',
                author_id: authorId
            };

            const bookId = await Book.create(bookData);
            const deleted = await Book.delete(bookId);
            expect(deleted).toBe(true);

            const book = await Book.findById(bookId);
            expect(book).toBeUndefined();
        });

        test('deve retornar false para ID inexistente', async () => {
            const deleted = await Book.delete(99999);
            expect(deleted).toBe(false);
        });
    });

    describe('findByAuthor', () => {
        test('deve retornar livros do autor', async () => {
            const books = await Book.findByAuthor(authorId);
            expect(Array.isArray(books)).toBe(true);
        });
    });
});

