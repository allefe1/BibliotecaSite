from flask import request, jsonify
from src.models.autor import Autor

class ControladorAutor:
    
    @staticmethod
    def criar_autor():
        dados = request.get_json()
        
        if not dados or 'nome' not in dados:
            return jsonify({'erro': 'Nome é obrigatório'}), 400
        
        try:
            autor = Autor(
                nome=dados['nome'],
                nacionalidade=dados.get('nacionalidade'),
                data_nascimento=dados.get('data_nascimento'),
                biografia=dados.get('biografia')
            )
            autor.salvar()
            return jsonify(autor.para_dict()), 201
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def listar_autores():
        try:
            autores = Autor.buscar_todos()
            return jsonify([autor.para_dict() for autor in autores]), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def obter_autor(id):
        try:
            autor = Autor.buscar_por_id(id)
            if autor:
                return jsonify(autor.para_dict()), 200
            return jsonify({'erro': 'Autor não encontrado'}), 404
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def atualizar_autor(id):
        dados = request.get_json()
        
        if not dados:
            return jsonify({'erro': 'Dados não fornecidos'}), 400
        
        try:
            autor = Autor.buscar_por_id(id)
            if not autor:
                return jsonify({'erro': 'Autor não encontrado'}), 404
            
            autor.nome = dados.get('nome', autor.nome)
            autor.nacionalidade = dados.get('nacionalidade', autor.nacionalidade)
            autor.data_nascimento = dados.get('data_nascimento', autor.data_nascimento)
            autor.biografia = dados.get('biografia', autor.biografia)
            
            autor.salvar()
            return jsonify(autor.para_dict()), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    @staticmethod
    def deletar_autor(id):
        try:
            autor = Autor.buscar_por_id(id)
            if not autor:
                return jsonify({'erro': 'Autor não encontrado'}), 404
            
            autor.deletar()
            return jsonify({'mensagem': 'Autor deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500

