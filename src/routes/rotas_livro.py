from flask import Blueprint
from src.controllers.controlador_livro import ControladorLivro

bp_livro = Blueprint('livro', __name__, url_prefix='/livros')

@bp_livro.route('', methods=['POST'])
def criar_livro():
    return ControladorLivro.criar_livro()

@bp_livro.route('', methods=['GET'])
def listar_livros():
    return ControladorLivro.listar_livros()

@bp_livro.route('/<int:id>', methods=['GET'])
def obter_livro(id):
    return ControladorLivro.obter_livro(id)

@bp_livro.route('/<int:id>', methods=['PUT'])
def atualizar_livro(id):
    return ControladorLivro.atualizar_livro(id)

@bp_livro.route('/<int:id>', methods=['DELETE'])
def deletar_livro(id):
    return ControladorLivro.deletar_livro(id)

