import sqlite3
import os

def obter_conexao_bd():
    caminho_bd = os.path.join(os.path.dirname(__file__), 'biblioteca.db')
    conexao = sqlite3.connect(caminho_bd)
    conexao.row_factory = sqlite3.Row
    return conexao

def inicializar_bd():
    conexao = obter_conexao_bd()
    cursor = conexao.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS autores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            nacionalidade TEXT,
            data_nascimento TEXT,
            biografia TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            isbn TEXT UNIQUE,
            ano_publicacao INTEGER,
            genero TEXT,
            numero_paginas INTEGER,
            autor_id INTEGER,
            FOREIGN KEY (autor_id) REFERENCES autores (id)
        )
    ''')
    
    conexao.commit()
    conexao.close()

if __name__ == '__main__':
    inicializar_bd()
    print("Banco de dados inicializado com sucesso!")

