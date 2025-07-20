const Book = require('../models/Book');
const Author = require('../models/Author');

class BookController {
    static async create(req, res) {
        try {
            const { titulo, isbn, ano_publicacao, author_id } = req.body;
            
            if (!titulo) {
                return res.status(400).json({ error: 'Título é obrigatório' });
            }

            if (author_id) {
                const author = await Author.findById(author_id);
                if (!author) {
                    return res.status(400).json({ error: 'Autor não encontrado' });
                }
            }

            const bookId = await Book.create({ titulo, isbn, ano_publicacao, author_id });
            const book = await Book.findById(bookId);
            
            res.status(201).json({ message: 'Livro criado com sucesso', book });
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'ISBN já existe' });
            }
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const books = await Book.findAll();
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);
            
            if (!book) {
                return res.status(404).json({ error: 'Livro não encontrado' });
            }
            
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, isbn, ano_publicacao, author_id } = req.body;
            
            if (!titulo) {
                return res.status(400).json({ error: 'Título é obrigatório' });
            }

            if (author_id) {
                const author = await Author.findById(author_id);
                if (!author) {
                    return res.status(400).json({ error: 'Autor não encontrado' });
                }
            }

            const updated = await Book.update(id, { titulo, isbn, ano_publicacao, author_id });
            
            if (!updated) {
                return res.status(404).json({ error: 'Livro não encontrado' });
            }
            
            const book = await Book.findById(id);
            res.json({ message: 'Livro atualizado com sucesso', book });
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'ISBN já existe' });
            }
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Book.delete(id);
            
            if (!deleted) {
                return res.status(404).json({ error: 'Livro não encontrado' });
            }
            
            res.json({ message: 'Livro excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }
}

module.exports = BookController;

