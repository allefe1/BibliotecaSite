from flask import Blueprint
from src.controllers.controlador_autor import ControladorAutor

bp_autor = Blueprint('autor', __name__, url_prefix='/autores')

@bp_autor.route('', methods=['POST'])
def criar_autor():
    return ControladorAutor.criar_autor()

@bp_autor.route('', methods=['GET'])
def listar_autores():
    return ControladorAutor.listar_autores()

@bp_autor.route('/<int:id>', methods=['GET'])
def obter_autor(id):
    return ControladorAutor.obter_autor(id)

@bp_autor.route('/<int:id>', methods=['PUT'])
def atualizar_autor(id):
    return ControladorAutor.atualizar_autor(id)

@bp_autor.route('/<int:id>', methods=['DELETE'])
def deletar_autor(id):
    return ControladorAutor.deletar_autor(id)

