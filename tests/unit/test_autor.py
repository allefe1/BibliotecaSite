import pytest
import json

class TestAutor:
    
    def test_criar_autor_sucesso(self, cliente):
        dados = {
            'nome': 'Machado de Assis',
            'nacionalidade': 'Brasileira',
            'data_nascimento': '1839-06-21',
            'biografia': 'Escritor brasileiro'
        }
        resposta = cliente.post('/autores', 
                               data=json.dumps(dados),
                               content_type='application/json')
        
        assert resposta.status_code == 201
        dados_resposta = json.loads(resposta.data)
        assert dados_resposta['nome'] == 'Machado de Assis'
        assert dados_resposta['id'] is not None
    
    def test_criar_autor_sem_nome(self, cliente):
        dados = {
            'nacionalidade': 'Brasileira'
        }
        resposta = cliente.post('/autores',
                               data=json.dumps(dados),
                               content_type='application/json')
        
        assert resposta.status_code == 400
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta
    
    def test_listar_autores(self, cliente):
        dados = {
            'nome': 'Clarice Lispector',
            'nacionalidade': 'Brasileira'
        }
        cliente.post('/autores',
                    data=json.dumps(dados),
                    content_type='application/json')
        
        resposta = cliente.get('/autores')
        assert resposta.status_code == 200
        dados_resposta = json.loads(resposta.data)
        assert len(dados_resposta) >= 1
    
    def test_obter_autor_existente(self, cliente):
        dados = {
            'nome': 'José de Alencar',
            'nacionalidade': 'Brasileira'
        }
        resposta_criacao = cliente.post('/autores',
                                       data=json.dumps(dados),
                                       content_type='application/json')
        autor_criado = json.loads(resposta_criacao.data)
        
        resposta = cliente.get(f'/autores/{autor_criado["id"]}')
        assert resposta.status_code == 200
        dados_resposta = json.loads(resposta.data)
        assert dados_resposta['nome'] == 'José de Alencar'
    
    def test_obter_autor_inexistente(self, cliente):
        resposta = cliente.get('/autores/999')
        assert resposta.status_code == 404
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta
    
    def test_atualizar_autor_sucesso(self, cliente):
        dados = {
            'nome': 'Lima Barreto',
            'nacionalidade': 'Brasileira'
        }
        resposta_criacao = cliente.post('/autores',
                                       data=json.dumps(dados),
                                       content_type='application/json')
        autor_criado = json.loads(resposta_criacao.data)
        
        dados_atualizacao = {
            'nome': 'Afonso Henriques de Lima Barreto',
            'biografia': 'Escritor e jornalista brasileiro'
        }
        resposta = cliente.put(f'/autores/{autor_criado["id"]}',
                              data=json.dumps(dados_atualizacao),
                              content_type='application/json')
        
        assert resposta.status_code == 200
        dados_resposta = json.loads(resposta.data)
        assert dados_resposta['nome'] == 'Afonso Henriques de Lima Barreto'
    
    def test_atualizar_autor_inexistente(self, cliente):
        dados = {
            'nome': 'Autor Inexistente'
        }
        resposta = cliente.put('/autores/999',
                              data=json.dumps(dados),
                              content_type='application/json')
        
        assert resposta.status_code == 404
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta
    
    def test_deletar_autor_sucesso(self, cliente):
        dados = {
            'nome': 'Graciliano Ramos',
            'nacionalidade': 'Brasileira'
        }
        resposta_criacao = cliente.post('/autores',
                                       data=json.dumps(dados),
                                       content_type='application/json')
        autor_criado = json.loads(resposta_criacao.data)
        
        resposta = cliente.delete(f'/autores/{autor_criado["id"]}')
        assert resposta.status_code == 200
        
        resposta_verificacao = cliente.get(f'/autores/{autor_criado["id"]}')
        assert resposta_verificacao.status_code == 404
    
    def test_deletar_autor_inexistente(self, cliente):
        resposta = cliente.delete('/autores/999')
        assert resposta.status_code == 404
        dados_resposta = json.loads(resposta.data)
        assert 'erro' in dados_resposta

