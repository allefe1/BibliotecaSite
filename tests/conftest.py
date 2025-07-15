import pytest
import os
import tempfile
from app import app
from src.database.configuracao_bd import inicializar_bd

@pytest.fixture
def cliente():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    
    with app.test_client() as cliente:
        with app.app_context():
            inicializar_bd()
        yield cliente
    
    os.close(db_fd)
    os.unlink(app.config['DATABASE'])

