from src.database.configuracao_bd import obter_conexao_bd

class Autor:
    def __init__(self, nome, nacionalidade=None, data_nascimento=None, biografia=None, id=None):
        self.id = id
        self.nome = nome
        self.nacionalidade = nacionalidade
        self.data_nascimento = data_nascimento
        self.biografia = biografia
    
    def salvar(self):
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        
        if self.id is None:
            cursor.execute('''
                INSERT INTO autores (nome, nacionalidade, data_nascimento, biografia)
                VALUES (?, ?, ?, ?)
            ''', (self.nome, self.nacionalidade, self.data_nascimento, self.biografia))
            self.id = cursor.lastrowid
        else:
            cursor.execute('''
                UPDATE autores 
                SET nome = ?, nacionalidade = ?, data_nascimento = ?, biografia = ?
                WHERE id = ?
            ''', (self.nome, self.nacionalidade, self.data_nascimento, self.biografia, self.id))
        
        conexao.commit()
        conexao.close()
        return self
    
    @staticmethod
    def buscar_todos():
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        cursor.execute('SELECT * FROM autores')
        linhas = cursor.fetchall()
        conexao.close()
        
        autores = []
        for linha in linhas:
            autor = Autor(
                id=linha['id'],
                nome=linha['nome'],
                nacionalidade=linha['nacionalidade'],
                data_nascimento=linha['data_nascimento'],
                biografia=linha['biografia']
            )
            autores.append(autor)
        return autores
    
    @staticmethod
    def buscar_por_id(id):
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        cursor.execute('SELECT * FROM autores WHERE id = ?', (id,))
        linha = cursor.fetchone()
        conexao.close()
        
        if linha:
            return Autor(
                id=linha['id'],
                nome=linha['nome'],
                nacionalidade=linha['nacionalidade'],
                data_nascimento=linha['data_nascimento'],
                biografia=linha['biografia']
            )
        return None
    
    def deletar(self):
        if self.id is None:
            return False
        
        conexao = obter_conexao_bd()
        cursor = conexao.cursor()
        cursor.execute('DELETE FROM autores WHERE id = ?', (self.id,))
        conexao.commit()
        conexao.close()
        return True
    
    def para_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'nacionalidade': self.nacionalidade,
            'data_nascimento': self.data_nascimento,
            'biografia': self.biografia
        }

