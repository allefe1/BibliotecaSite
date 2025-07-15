from flask import Flask, render_template
from flask_cors import CORS
from src.routes.rotas_autor import bp_autor
from src.routes.rotas_livro import bp_livro
from src.database.configuracao_bd import inicializar_bd

app = Flask(__name__)
CORS(app)

app.register_blueprint(bp_autor)
app.register_blueprint(bp_livro)

@app.route('/autores')
def listar_autores():
    return render_template('listar_autores.html')

@app.route('/livros')
def listar_livros():
    return render_template('listar_livros.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/autores/novo')
def novo_autor():
    return render_template('novo_autor.html')

@app.route('/livros/novo')
def novo_livro():
    return render_template('novo_livro.html')

if __name__ == '__main__':
    inicializar_bd()
    app.run(host='0.0.0.0', port=5000, debug=True)

