from flask import request, jsonify
from src.models.livro import Livro
from src.models.autor import Autor

class ControladorLivro:
    
    @staticmethod
    def criar_livro():
        dados = request.get_json()
        
        if not dados or 'titulo' not in dados:
            return jsonify({'erro': 'Título é obrigatório'}), 400
        
        if 'autor_id' in dados and dados['autor_id']:
            autor = Autor.buscar_por_id(dados['autor_id'])
            if not autor:
                return jsonify({'erro': 'Autor não encontrado'}), 400
        
        try:
            livro = Livro(
                titulo=dados['titulo'],
                isbn=dados.get('isbn'),
                ano_publicacao=dados.get('ano_publicacao'),
                genero=dados.get('genero'),
                numero_paginas=dados.get('numero_paginas'),
                autor_id=dados.get('autor_id')
            )
            livro.salvar()
            return jsonify(livro.para_dict()), 201
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def listar_livros():
        try:
            livros = Livro.buscar_todos()
            return jsonify([livro.para_dict() for livro in livros]), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def obter_livro(id):
        try:
            livro = Livro.buscar_por_id(id)
            if livro:
                return jsonify(livro.para_dict()), 200
            return jsonify({'erro': 'Livro não encontrado'}), 404
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def atualizar_livro(id):
        dados = request.get_json()
        
        if not dados:
            return jsonify({'erro': 'Dados não fornecidos'}), 400
        
        try:
            livro = Livro.buscar_por_id(id)
            if not livro:
                return jsonify({'erro': 'Livro não encontrado'}), 404
            
            if 'autor_id' in dados and dados['autor_id']:
                autor = Autor.buscar_por_id(dados['autor_id'])
                if not autor:
                    return jsonify({'erro': 'Autor não encontrado'}), 400
            
            livro.titulo = dados.get('titulo', livro.titulo)
            livro.isbn = dados.get('isbn', livro.isbn)
            livro.ano_publicacao = dados.get('ano_publicacao', livro.ano_publicacao)
            livro.genero = dados.get('genero', livro.genero)
            livro.numero_paginas = dados.get('numero_paginas', livro.numero_paginas)
            livro.autor_id = dados.get('autor_id', livro.autor_id)
            
            livro.salvar()
            return jsonify(livro.para_dict()), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def deletar_livro(id):
        try:
            livro = Livro.buscar_por_id(id)
            if not livro:
                return jsonify({'erro': 'Livro não encontrado'}), 404
            
            livro.deletar()
            return jsonify({'mensagem': 'Livro deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500

