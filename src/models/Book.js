const { runQuery, getQuery, allQuery } = require('../database/database');

class Book {
    constructor(titulo, isbn, ano_publicacao, author_id) {
        this.titulo = titulo;
        this.isbn = isbn;
        this.ano_publicacao = ano_publicacao;
        this.author_id = author_id;
    }

    static async create(bookData) {
        const { titulo, isbn, ano_publicacao, author_id } = bookData;
        const sql = `INSERT INTO books (titulo, isbn, ano_publicacao, author_id) VALUES (?, ?, ?, ?)`;
        const result = await runQuery(sql, [titulo, isbn, ano_publicacao, author_id]);
        return result.id;
    }

    static async findAll() {
        const sql = `
            SELECT b.*, a.nome as author_name 
            FROM books b 
            LEFT JOIN authors a ON b.author_id = a.id 
            ORDER BY b.titulo
        `;
        return await allQuery(sql);
    }

    static async findById(id) {
        const sql = `
            SELECT b.*, a.nome as author_name 
            FROM books b 
            LEFT JOIN authors a ON b.author_id = a.id 
            WHERE b.id = ?
        `;
        return await getQuery(sql, [id]);
    }

    static async update(id, bookData) {
        const { titulo, isbn, ano_publicacao, author_id } = bookData;
        const sql = `UPDATE books SET titulo = ?, isbn = ?, ano_publicacao = ?, author_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        const result = await runQuery(sql, [titulo, isbn, ano_publicacao, author_id, id]);
        return result.changes > 0;
    }

    static async delete(id) {
        const sql = `DELETE FROM books WHERE id = ?`;
        const result = await runQuery(sql, [id]);
        return result.changes > 0;
    }

    static async findByAuthor(authorId) {
        const sql = `SELECT * FROM books WHERE author_id = ? ORDER BY titulo`;
        return await allQuery(sql, [authorId]);
    }
}

module.exports = Book;

