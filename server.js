require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const auth = require('./middleware/auth');
const loginRoutes = require('./rotas/login');
const cadastroRoutes = require('./rotas/cadastro');
const postRoutes = require('./rotas/post');
const getRoutes = require('./rotas/get');

const { processarDados } = require('./automacao/automacao');

const app = express();

// Criação do banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados estabelecida.');
  }
});

// Criação das tabelas, caso não existam
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sensores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      valor REAL NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);
});



app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/cadastro', cadastroRoutes);

app.use('/post', postRoutes);
app.use('/get', getRoutes);

// Rota para obter dados de sensores e automação
app.get('/dados', auth, (req, res) => {
  processarDados();
  res.send('Automação processada.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
