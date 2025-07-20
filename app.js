const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const authorRoutes = require('./src/routes/authorRoutes');
const bookRoutes = require('./src/routes/bookRoutes');


const database = require('./src/database/database');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


app.use(express.static(path.join(__dirname, 'src/public')));


app.get('/', (req, res) => {
    res.render('index', { title: 'Sistema de Cadastro de Livros e Autores' });
});


app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);


app.get('/autores/novo', (req, res) => {
    res.render('authors/new', { title: 'Cadastrar Autor' });
});

app.get('/livros/novo', (req, res) => {
    res.render('books/new', { title: 'Cadastrar Livro' });
});

app.get('/autores', (req, res) => {
    res.render('authors/list', { title: 'Lista de Autores' });
});

app.get('/livros', (req, res) => {
    res.render('books/list', { title: 'Lista de Livros' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});


app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Acesse: http://localhost:${PORT}`);
    });
}

module.exports = app;

