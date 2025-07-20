const Author = require('../models/Author');

class AuthorController {
    static async create(req, res) {
        try {
            const { nome, nacionalidade, data_nascimento } = req.body;
            
            if (!nome) {
                return res.status(400).json({ error: 'Nome é obrigatório' });
            }

            const authorId = await Author.create({ nome, nacionalidade, data_nascimento });
            const author = await Author.findById(authorId);
            
            res.status(201).json({ message: 'Autor criado com sucesso', author });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const authors = await Author.findAll();
            res.json(authors);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const author = await Author.findById(id);
            
            if (!author) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }
            
            res.json(author);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, nacionalidade, data_nascimento } = req.body;
            
            if (!nome) {
                return res.status(400).json({ error: 'Nome é obrigatório' });
            }

            const updated = await Author.update(id, { nome, nacionalidade, data_nascimento });
            
            if (!updated) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }
            
            const author = await Author.findById(id);
            res.json({ message: 'Autor atualizado com sucesso', author });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Author.delete(id);
            
            if (!deleted) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }
            
            res.json({ message: 'Autor excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }
}

module.exports = AuthorController;

