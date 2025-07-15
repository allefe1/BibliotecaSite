from src.database.configuracao_bd import obter_conexao_bd

class Livro:
    def __init__(self, titulo, isbn=None, ano_publicacao=None, genero=None, numero_paginas=None, autor_id=None, id=None):
        self.id = id
        self.titulo = titulo
        self.isbn = isbn
        self.ano_publicacao = ano_publicacao
        self.genero = genero
        self.numero_paginas = numero_paginas
        self.autor_id = autor_id
    
    def salvar(self):
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        
        if self.id is None:
            cursor.execute('''
                INSERT INTO livros (titulo, isbn, ano_publicacao, genero, numero_paginas, autor_id)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (self.titulo, self.isbn, self.ano_publicacao, self.genero, self.numero_paginas, self.autor_id))
            self.id = cursor.lastrowid
        else:
            cursor.execute('''
                UPDATE livros 
                SET titulo = ?, isbn = ?, ano_publicacao = ?, genero = ?, numero_paginas = ?, autor_id = ?
                WHERE id = ?
            ''', (self.titulo, self.isbn, self.ano_publicacao, self.genero, self.numero_paginas, self.autor_id, self.id))       
        conexao.commit()
        conexao.close()
        return self
    
    @staticmethod
    def buscar_todos():
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        cursor.execute('''
            SELECT l.*, a.nome as nome_autor 
            FROM livros l 
            LEFT JOIN autores a ON l.autor_id = a.id
        ''')
        linhas = cursor.fetchall()
        conexao.close()
        
        livros = []
        for linha in linhas:
            livro = Livro(
                id=linha['id'],
                titulo=linha['titulo'],
                isbn=linha['isbn'],
                ano_publicacao=linha['ano_publicacao'],
                genero=linha['genero'],
                numero_paginas=linha['numero_paginas'],
                autor_id=linha['autor_id']
            )
            livro.nome_autor = linha['nome_autor']
            livros.append(livro)
        return livros
    
    @staticmethod
    def buscar_por_id(id):
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        cursor.execute('''
            SELECT l.*, a.nome as nome_autor 
            FROM livros l 
            LEFT JOIN autores a ON l.autor_id = a.id 
            WHERE l.id = ?
        ''', (id,))
        linha = cursor.fetchone()
        conexao.close()
        
        if linha:
            livro = Livro(
                id=linha['id'],
                titulo=linha['titulo'],
                isbn=linha['isbn'],
                ano_publicacao=linha['ano_publicacao'],
                genero=linha['genero'],
                numero_paginas=linha['numero_paginas'],
                autor_id=linha['autor_id']
            )
            livro.nome_autor = linha['nome_autor']
            return livro
        return None
    
    def deletar(self):
        if self.id is None:
            return False
        
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        cursor.execute('DELETE FROM livros WHERE id = ?', (self.id,))
        conexao.commit()
        conexao.close()
        return True
    
    def para_dict(self):
        resultado = {
            'id': self.id,
            'titulo': self.titulo,
            'isbn': self.isbn,
            'ano_publicacao': self.ano_publicacao,
            'genero': self.genero,
            'numero_paginas': self.numero_paginas,
            'autor_id': self.autor_id
        }
        if hasattr(self, 'nome_autor'):
            resultado['nome_autor'] = self.nome_autor
        return resultado

