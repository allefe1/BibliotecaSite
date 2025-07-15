import pytest
import json

class TestLivro:
    
    def test_criar_livro_sucesso(self, cliente):
        dados_autor = {
            'nome': 'Machado de Assis',
            'nacionalidade': 'Brasileira'
        }
        resposta_autor = cliente.post('/autores',
                                     data=json.dumps(dados_autor),
                                     content_type='application/json')
        autor_criado = json.loads(resposta_autor.data)
        
        dados_livro = {
            'titulo': 'Dom Casmurro',
            'isbn': f'978-85-359-{autor_criado["id"]:04d}-5',
            'ano_publicacao': 1899,
            'genero': 'Romance',
            'numero_paginas': 256,
            'autor_id': autor_criado['id']
        }
        resposta = cliente.post('/livros',
                               data=json.dumps(dados_livro),
                               content_type='application/json')
        
        assert resposta.status_code == 201
        dados_resposta = json.loads(resposta.data)
        assert dados_resposta['titulo'] == 'Dom Casmurro'
        assert dados_resposta['id'] is not None
    
    def test_criar_livro_sem_titulo(self, cliente):
        dados = {
            'isbn': '978-85-359-0277-5'
        }
        resposta = cliente.post('/livros',
                               data=json.dumps(dados),
                               content_type='application/json')
        
        assert resposta.status_code == 400
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta
    
    def test_criar_livro_autor_inexistente(self, cliente):
        dados = {
            'titulo': 'Livro Teste',
            'autor_id': 999
        }
        resposta = cliente.post('/livros',
                               data=json.dumps(dados),
                               content_type='application/json')
        
        assert resposta.status_code == 400
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta
    
    def test_listar_livros(self, cliente):
        dados_autor = {
            'nome': 'Clarice Lispector',
            'nacionalidade': 'Brasileira'
        }
        resposta_autor = cliente.post('/autores',
                                     data=json.dumps(dados_autor),
                                     content_type='application/json')
        autor_criado = json.loads(resposta_autor.data)
        
        dados_livro = {
            'titulo': 'A Hora da Estrela',
            'autor_id': autor_criado['id']
        }
        cliente.post('/livros',
                    data=json.dumps(dados_livro),
                    content_type='application/json')
        
        resposta = cliente.get('/livros')
        assert resposta.status_code == 200
        dados_resposta = json.loads(resposta.data)
        assert len(dados_resposta) >= 1
    
    def test_obter_livro_existente(self, cliente):
        dados_autor = {
            'nome': 'José de Alencar',
            'nacionalidade': 'Brasileira'
        }
        resposta_autor = cliente.post('/autores',
                                     data=json.dumps(dados_autor),
                                     content_type='application/json')
        autor_criado = json.loads(resposta_autor.data)
        
        dados_livro = {
            'titulo': 'O Guarani',
            'autor_id': autor_criado['id']
        }
        resposta_criacao = cliente.post('/livros',
                                       data=json.dumps(dados_livro),
                                       content_type='application/json')
        livro_criado = json.loads(resposta_criacao.data)
        
        resposta = cliente.get(f'/livros/{livro_criado["id"]}')
        assert resposta.status_code == 200
        dados_resposta = json.loads(resposta.data)
        assert dados_resposta['titulo'] == 'O Guarani'
    
    def test_obter_livro_inexistente(self, cliente):
        resposta = cliente.get('/livros/999')
        assert resposta.status_code == 404
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta
    
    def test_atualizar_livro_sucesso(self, cliente):
        dados_autor = {
            'nome': 'Lima Barreto',
            'nacionalidade': 'Brasileira'
        }
        resposta_autor = cliente.post('/autores',
                                     data=json.dumps(dados_autor),
                                     content_type='application/json')
        autor_criado = json.loads(resposta_autor.data)
        
        dados_livro = {
            'titulo': 'Triste Fim de Policarpo Quaresma',
            'autor_id': autor_criado['id']
        }
        resposta_criacao = cliente.post('/livros',
                                       data=json.dumps(dados_livro),
                                       content_type='application/json')
        livro_criado = json.loads(resposta_criacao.data)
        
        dados_atualizacao = {
            'titulo': 'O Triste Fim de Policarpo Quaresma',
            'genero': 'Romance'
        }
        resposta = cliente.put(f'/livros/{livro_criado["id"]}',
                              data=json.dumps(dados_atualizacao),
                              content_type='application/json')
        
        assert resposta.status_code == 200
        dados_resposta = json.loads(resposta.data)
        assert dados_resposta['titulo'] == 'O Triste Fim de Policarpo Quaresma'
    
    def test_atualizar_livro_inexistente(self, cliente):
        dados = {
            'titulo': 'Livro Inexistente'
        }
        resposta = cliente.put('/livros/999',
                              data=json.dumps(dados),
                              content_type='application/json')
        
        assert resposta.status_code == 404
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta
    
    def test_deletar_livro_sucesso(self, cliente):
        dados_autor = {
            'nome': 'Graciliano Ramos',
            'nacionalidade': 'Brasileira'
        }
        resposta_autor = cliente.post('/autores',
                                     data=json.dumps(dados_autor),
                                     content_type='application/json')
        autor_criado = json.loads(resposta_autor.data)
        
        dados_livro = {
            'titulo': 'Vidas Secas',
            'autor_id': autor_criado['id']
        }
        resposta_criacao = cliente.post('/livros',
                                       data=json.dumps(dados_livro),
                                       content_type='application/json')
        livro_criado = json.loads(resposta_criacao.data)
        
        resposta = cliente.delete(f'/livros/{livro_criado["id"]}')
        assert resposta.status_code == 200
        
        resposta_verificacao = cliente.get(f'/livros/{livro_criado["id"]}')
        assert resposta_verificacao.status_code == 404
    
    def test_deletar_livro_inexistente(self, cliente):
        resposta = cliente.delete('/livros/999')
        assert resposta.status_code == 404
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta

