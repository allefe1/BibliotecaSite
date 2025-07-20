const { runQuery, getQuery, allQuery } = require('../database/database');

class Author {
    constructor(nome, nacionalidade, data_nascimento) {
        this.nome = nome;
        this.nacionalidade = nacionalidade;
        this.data_nascimento = data_nascimento;
    }

    static async create(authorData) {
        const { nome, nacionalidade, data_nascimento } = authorData;
        const sql = `INSERT INTO authors (nome, nacionalidade, data_nascimento) VALUES (?, ?, ?)`;
        const result = await runQuery(sql, [nome, nacionalidade, data_nascimento]);
        return result.id;
    }

    static async findAll() {
        const sql = `SELECT * FROM authors ORDER BY nome`;
        return await allQuery(sql);
    }

    static async findById(id) {
        const sql = `SELECT * FROM authors WHERE id = ?`;
        return await getQuery(sql, [id]);
    }

    static async update(id, authorData) {
        const { nome, nacionalidade, data_nascimento } = authorData;
        const sql = `UPDATE authors SET nome = ?, nacionalidade = ?, data_nascimento = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        const result = await runQuery(sql, [nome, nacionalidade, data_nascimento, id]);
        return result.changes > 0;
    }

    static async delete(id) {
        const sql = `DELETE FROM authors WHERE id = ?`;
        const result = await runQuery(sql, [id]);
        return result.changes > 0;
    }

    static async findWithBooks(id) {
        const sql = `
            SELECT a.*, b.id as book_id, b.titulo, b.isbn, b.ano_publicacao
            FROM authors a
            LEFT JOIN books b ON a.id = b.author_id
            WHERE a.id = ?
        `;
        return await allQuery(sql, [id]);
    }
}

module.exports = Author;

