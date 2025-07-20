const API_BASE = '/api';

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function showLoading(element) {
    element.innerHTML = '<div class="loading">Carregando...</div>';
}

async function loadAuthors() {
    try {
        const response = await fetch(`${API_BASE}/authors`);
        const authors = await response.json();
        return authors;
    } catch (error) {
        console.error('Erro ao carregar autores:', error);
        return [];
    }
}

async function loadBooks() {
    try {
        const response = await fetch(`${API_BASE}/books`);
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
        return [];
    }
}

async function deleteAuthor(id) {
    if (!confirm('Tem certeza que deseja excluir este autor?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/authors/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('Autor excluído com sucesso');
            location.reload();
        } else {
            const error = await response.json();
            showAlert(error.error, 'error');
        }
    } catch (error) {
        showAlert('Erro ao excluir autor', 'error');
    }
}

async function deleteBook(id) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/books/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('Livro excluído com sucesso');
            location.reload();
        } else {
            const error = await response.json();
            showAlert(error.error, 'error');
        }
    } catch (error) {
        showAlert('Erro ao excluir livro', 'error');
    }
}

async function submitAuthorForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        nome: formData.get('nome'),
        nacionalidade: formData.get('nacionalidade'),
        data_nascimento: formData.get('data_nascimento')
    };
    
    try {
        const response = await fetch(`${API_BASE}/authors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showAlert('Autor cadastrado com sucesso');
            event.target.reset();
        } else {
            const error = await response.json();
            showAlert(error.error, 'error');
        }
    } catch (error) {
        showAlert('Erro ao cadastrar autor', 'error');
    }
}

async function submitBookForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        titulo: formData.get('titulo'),
        isbn: formData.get('isbn'),
        ano_publicacao: parseInt(formData.get('ano_publicacao')),
        author_id: parseInt(formData.get('author_id')) || null
    };
    
    try {
        const response = await fetch(`${API_BASE}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showAlert('Livro cadastrado com sucesso');
            event.target.reset();
        } else {
            const error = await response.json();
            showAlert(error.error, 'error');
        }
    } catch (error) {
        showAlert('Erro ao cadastrar livro', 'error');
    }
}

